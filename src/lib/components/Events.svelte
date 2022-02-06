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

  let events: Event[] = []
  $: events = data.events
    .filter((a: any) => new Date(new Date(a.to).getTime() + (a.delayed || 0) * 60000).getTime() - time.getTime() > 0)
    .sort((a: any, b: any) => new Date(a.from).getTime() - new Date(b.from).getTime())
</script>

<main>
  {#each events as event, i}
    {#if i < max || max < 0}
      <div class="event" class:active={new Date(new Date(event.from).getTime() + (event.delayed || 0) * 60000).getTime() - time.getTime() <= 0}>
        <div style="display: flex;gap: 20px;overflow: hidden;">
          {#if event.icon}
            <div class="icon">
              <Icon id={event.icon} color={event.color || null} size={1.4} />
            </div>
          {/if}
          <div style="display: flex;flex-direction: column;justify-content: space-evenly;overflow: hidden;">
            <span style="display: flex;gap: 10px;">
              <h3 style:color={event.color || null}>{event.name}</h3>
              {#if event.location}
                <span style="display: flex;align-items: center;opacity: 0.5;">
                  <Icon id="location" size={0.8} />
                  <span>{event.location}</span>
                </span>
              {/if}
            </span>
            {#if event.description}
              <p style="padding-right: 10px;">{@html event.description}</p>
            {/if}
          </div>
        </div>
        <div style="text-align: right;display: flex;flex-direction: column;justify-content: space-evenly;height: 100%;">
          <div>
            <span class:delayed={event.delayed}>
              {addZero(new Date(event.from).getHours())}:{addZero(new Date(event.from).getMinutes())}
            </span>
            {#if event.delayed}
              <span style:color="orange">
                {addZero(new Date(new Date(event.from).getTime() + event.delayed * 60000).getHours())}:{addZero(
                  new Date(new Date(event.from).getTime() + event.delayed * 60000).getMinutes()
                )}
              </span>
            {/if}
          </div>
          {#if new Date(new Date(event.from).getTime() + (event.delayed || 0) * 60000).getTime() - time.getTime() <= 0}
            <div style="display: flex;justify-content: space-between;">
              <span class:delayed={event.delayed}>
                {addZero(new Date(event.to).getHours())}:{addZero(new Date(event.to).getMinutes())}
              </span>
              {#if event.delayed}
                <span style:color="orange">
                  {addZero(new Date(new Date(event.to).getTime() + event.delayed * 60000).getHours())}:{addZero(
                    new Date(new Date(event.to).getTime() + event.delayed * 60000).getMinutes()
                  )}
                </span>
              {/if}
            </div>
          {:else}
            <div style:opacity={0.5}>
              <Countdown {time} end={new Date(new Date(event.from).getTime() + (event.delayed || 0) * 60000)} style={"justify-content: right;"} />
            </div>
          {/if}
        </div>
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
