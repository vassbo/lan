<script lang="ts">
    import Icon from "$lib/components/Icon.svelte"

    export let data: any

    function updateData({ key, index }) {
        if (key === "delete") {
            if (confirm("Vil du slette?")) data.info.splice(index, 1)
            return
        }

        if (key === "moveUp") {
            array_move(data.info, index, index - 1)
            return
        }

        if (!getData[key]) return console.log("MISSING KEY", key)

        let currentData = data.info[index][key]
        let newValue = getData[key](currentData)

        const canBeEmpty = ["description"]
        if (!newValue && (!canBeEmpty.includes(key) || newValue === null)) return

        data.info[index][key] = newValue
    }

    const getData = {
        name: (current) => {
            return prompt("Navn", current)
        },
        description: (current) => {
            return prompt("Beskrivelse", current)
        },
        icon: (current) => {
            return prompt("Ikon (location, info, wifi, game, bed, wc, virus, food, trophy, movie, trash, announcement, tag, thumb, star, tractor, ice)", current)
        },
    }

    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1
            while (k--) {
                arr.push(undefined)
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
        return arr
    }

    function newInfo() {
        data.info.push({ name: "INFO", icon: "star" })
    }
</script>

<div class="main">
    {#each data.info as info, i}
        <div class="info" style="justify-content: space-between;">
            <span class="info">
                {#if info.icon}
                    <span class="icon" on:click={() => updateData({ key: "icon", index: i })}>
                        <Icon id={info.icon} />
                    </span>
                {/if}
                <h4 style="white-space: nowrap;" on:click={() => updateData({ key: "name", index: i })}>{info.name}</h4>
                {#if info.description}
                    <p on:click={() => updateData({ key: "description", index: i })}>{info.description}</p>
                {:else}
                    <p style="opacity: 0.2;font-style: italic;" on:click={() => updateData({ key: "description", index: i })}>Legg til beskrivelse</p>
                {/if}
            </span>
            <span style="display: flex;align-items: center;gap: 10px;">
                {#if i}
                    <div class="up" on:click={() => updateData({ key: "moveUp", index: i })}>^</div>
                {/if}
                <div class="icon" on:click={() => updateData({ key: "delete", index: i })}>
                    <Icon id="trash" color="#AA0000" size={1} />
                </div>
            </span>
        </div>
    {/each}
    <button on:click={newInfo}>Legg til ny</button>
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        gap: 5px;
        flex: 1;
    }

    .info {
        border: 3px solid rgb(255 255 255 / 0.3);
        background-color: rgb(0 0 0 / 0.8);
        width: 100%;
        padding: 5px 10px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 5;
        /* cursor: pointer; */
    }
    .info .info {
        border: none;
    }

    .up {
        font-weight: bold;
        font-size: 1.5em;
    }

    /* .info:hover {
    background-color: rgb(255 255 255 / 0.1);
  } */
</style>
