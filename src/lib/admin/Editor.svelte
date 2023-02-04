<script lang="ts">
    import Time from "$lib/components/Time.svelte"
    import Events from "$lib/components/Events.svelte"
    import { onMount } from "svelte"
    import InfoList from "./InfoList.svelte"

    let data: any = {}

    onMount(async () => {
        fetch("https://json.extendsclass.com/bin/c1f9f4b148a4", { cache: "no-store" })
            .then((response) => response.json())
            .then((d) => (data = d))
            .catch((error) => console.log(error))
    })

    function newEvent() {
        data.events.push({ name: "NY HENDELSE", icon: "star", from: new Date().getFullYear() + "-01-01 00:00", to: "2023-01-01 01:00" })
    }

    function save() {
        // TODO:
        navigator.clipboard.writeText(JSON.stringify(data, null, 4))

        setTimeout(() => {
            window.open("https://extendsclass.com/jsonstorage/c1f9f4b148a4")
        }, 100)
    }
</script>

{#if Object.keys(data).length}
    <Time let:time>
        <div>
            <span style="flex: 1.8;">
                <Events {time} bind:data edit />
                <button on:click={newEvent}>Legg til ny</button>
            </span>
            <InfoList bind:data />
        </div>
        <div>
            <button on:click={save}>LAGRE (CTRL + V - "Save bin")</button>
        </div>
    </Time>
{/if}

<style>
    div {
        display: flex;
        gap: 50px;
        padding: 50px;
    }

    div :global(button) {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
        padding: 10px 20px;
        border-radius: 8px;
        background: none;
        border: 3px solid rgb(255 255 255 / 0.2);
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        margin-top: 5px;
        transition: background-color 0.3s;
    }

    div :global(button):hover {
        background-color: rgb(255 255 255 / 0.1);
    }
</style>
