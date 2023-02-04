<script lang="ts">
    import { addZero } from "$lib/scripts/timer"
    import Countdown from "./Countdown.svelte"
    import Icon from "./Icon.svelte"

    interface Event {
        name: string
        description?: string
        color?: string
        icon?: string
        from: string // YYYY-MM-DD HH:MM
        to: string // YYYY-MM-DD HH:MM
        location?: string
        delayed?: number // minutes
    }

    export let time: Date
    export let data: any
    export let max: number = 6
    export let edit: boolean = false

    let events: Event[] = []
    $: events = data.events
        .filter((a: any) => edit || new Date(new Date(a.to).getTime() + (a.delayed || 0) * 60000).getTime() - time.getTime() > 0)
        .sort((a: any, b: any) => new Date(a.from).getTime() - new Date(b.from).getTime())

    function updateData({ key, index }) {
        if (!edit) return

        if (key === "delete") {
            if (confirm("Vil du slette?")) events.splice(index, 1)
            data.events = events
            return
        }

        if (!getData[key]) return console.log("MISSING KEY", key)

        let currentData = events[index][key]
        let newValue = getData[key](currentData)

        const canBeEmpty = ["description", "location"]
        if ((!newValue || newValue === "0") && (!canBeEmpty.includes(key) || newValue === null)) {
            if (key === "delayed") delete events[index][key]
            else return
        } else {
            events[index][key] = newValue
        }

        data.events = events
    }

    const getData = {
        name: (current) => {
            return prompt("Navn", current)
        },
        location: (current) => {
            return prompt("Plassering", current)
        },
        description: (current) => {
            return prompt("Beskrivelse (ENTER: <br>)", current)
        },
        icon: (current) => {
            return prompt("Ikon (location, info, wifi, game, bed, wc, virus, food, trophy, movie, trash, announcement, tag, thumb, star, tractor, ice)", current)
        },
        color: (current) => {
            return prompt("Farge (f.eks: #EDC855 (gul), #75A158 (grønn), #8ABFF5 (blå))", current)
        },
        from: (current) => {
            return prompt("Fra", current)
        },
        to: (current) => {
            return prompt("Til", current)
        },
        delayed: (current) => {
            return prompt("Utsett (I minutter)", current)
        },
    }
</script>

<main>
    {#each events as event, i}
        {#if i < max || edit}
            <div class="event" class:active={new Date(new Date(event.from).getTime() + (event.delayed || 0) * 60000).getTime() - time.getTime() <= 0}>
                <div style="display: flex;gap: 20px;overflow: hidden;">
                    {#if edit}
                        <div class="color" style="width: 8px;background-color: {event.color || 'white'};" on:click={() => updateData({ key: "color", index: i })} />
                    {/if}
                    {#if event.icon}
                        <div class="icon" on:click={() => updateData({ key: "icon", index: i })}>
                            <Icon id={event.icon} color={event.color || null} size={1.4} />
                        </div>
                    {/if}
                    <div style="display: flex;flex-direction: column;justify-content: space-evenly;overflow: hidden;">
                        <span style="display: flex;gap: 10px;">
                            <h3 style:color={event.color || null} on:click={() => updateData({ key: "name", index: i })}>{event.name}</h3>
                            {#if event.location}
                                <span style="display: flex;align-items: center;opacity: 0.5;" on:click={() => updateData({ key: "location", index: i })}>
                                    <Icon id="location" size={0.8} />
                                    <span>{event.location}</span>
                                </span>
                            {:else if edit}
                                <span style="display: flex;align-items: center;opacity: 0.2;font-style: italic;" on:click={() => updateData({ key: "location", index: i })}>
                                    <Icon id="location" size={0.8} />
                                    <span>Legg til plassering</span>
                                </span>
                            {/if}
                        </span>
                        {#if event.description}
                            <p style="padding-right: 10px;" on:click={() => updateData({ key: "description", index: i })}>{@html event.description}</p>
                        {:else if edit}
                            <p style="padding-right: 10px;opacity: 0.2;font-style: italic;" on:click={() => updateData({ key: "description", index: i })}>Legg til beskrivelse</p>
                        {/if}
                    </div>
                </div>
                <div style="text-align: right;display: flex;flex-direction: column;justify-content: space-evenly;height: 100%;">
                    <div>
                        <span class:delayed={event.delayed} on:click={() => updateData({ key: "from", index: i })}>
                            {#if edit}
                                <span style="font-size:0.8em;">
                                    {new Date(event.from).getFullYear()}-{addZero(new Date(event.from).getMonth() + 1)}-{addZero(new Date(event.from).getDate())}
                                </span>
                            {/if}
                            {addZero(new Date(event.from).getHours())}:{addZero(new Date(event.from).getMinutes())}
                        </span>
                        {#if event.delayed}
                            <span style:color="orange" on:click={() => updateData({ key: "delayed", index: i })}>
                                {addZero(new Date(new Date(event.from).getTime() + event.delayed * 60000).getHours())}:{addZero(
                                    new Date(new Date(event.from).getTime() + event.delayed * 60000).getMinutes()
                                )}
                            </span>
                        {:else if edit}
                            <span style:color="orange" style="opacity: 0.2;font-style: italic;" on:click={() => updateData({ key: "delayed", index: i })}>Utsett</span>
                        {/if}
                    </div>
                    {#if new Date(new Date(event.from).getTime() + (event.delayed || 0) * 60000).getTime() - time.getTime() <= 0}
                        <div style="display: flex;justify-content: space-between;">
                            <span class:delayed={event.delayed} on:click={() => updateData({ key: "to", index: i })}>
                                {#if edit}
                                    <span style="font-size:0.8em;">
                                        {new Date(event.to).getFullYear()}-{addZero(new Date(event.to).getMonth() + 1)}-{addZero(new Date(event.to).getDate())}
                                    </span>
                                {/if}
                                {addZero(new Date(event.to).getHours())}:{addZero(new Date(event.to).getMinutes())}
                            </span>
                            {#if event.delayed}
                                <span style:color="orange" on:click={() => updateData({ key: "delayed", index: i })}>
                                    {addZero(new Date(new Date(event.to).getTime() + event.delayed * 60000).getHours())}:{addZero(
                                        new Date(new Date(event.to).getTime() + event.delayed * 60000).getMinutes()
                                    )}
                                </span>
                            {/if}
                        </div>
                    {:else}
                        <div style:opacity={0.5} on:click={() => updateData({ key: "to", index: i })}>
                            <Countdown {time} end={new Date(new Date(event.from).getTime() + (event.delayed || 0) * 60000)} style={"justify-content: right;"} />
                        </div>
                    {/if}
                </div>
                {#if edit}
                    <div class="icon" style="position: absolute;right: 0;" on:click={() => updateData({ key: "delete", index: i })}>
                        <Icon id="trash" color="#AA0000" size={1} />
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .event {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        overflow: hidden;
        padding: 10px 20px;
        border-radius: 8px;
        border: 3px solid rgb(255 255 255 / 0.2);
        transition: background-color 1s;
    }

    .active {
        background-color: rgb(255 255 255 / 0.2);
    }

    .icon {
        display: flex;
        align-items: center;
        padding: 10px 0;
    }

    .delayed {
        text-decoration: line-through;
        opacity: 0.8;
    }
</style>
