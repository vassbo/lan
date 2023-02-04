<script lang="ts">
    import { onMount } from "svelte"

    export let debug: boolean = false
    export let data: any = {}

    let time: Date = new Date()
    let duration: number = 1000

    onMount(() => {
        const interval = setInterval(() => {
            if (debug) time = new Date(time.getTime() + duration)
            else time = new Date()
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    })

    const changeDuration = (e) => (duration = e.target.value * 1000)
</script>

<slot {time} />

{#if debug}
    <div class="debug">
        <span>
            <button on:click={() => (duration -= 1000)}>{"<-"}</button>
            <input type="text" on:change={changeDuration} value={duration / 1000} />
            <button on:click={() => (duration += 1000)}>{"->"}</button>
        </span>
        <span>
            {time}
        </span>
        <span>
            <button
                on:click={() => {
                    // 2023-01-01 00:00
                    let start = data.start.split("-")

                    start[2] = start[2].split(" ")
                    start[2][0] = Number(start[2][0]) - 1
                    start[2] = start[2].join(" ")
                    start = start.join("-")

                    time = new Date(start)
                }}
            >
                Skip to the day before
            </button>
            <button on:click={() => (time = new Date(data.start))}>To start</button>
        </span>
    </div>
{/if}

<style>
    .debug {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
    }
</style>
