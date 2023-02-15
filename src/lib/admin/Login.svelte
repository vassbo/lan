<script lang="ts">
    import { process } from "$lib/scripts/process"

    export let loggedin: boolean

    let value: string = ""

    // https://dev.to/danawoodman/storing-environment-variables-in-sveltekit-2of3
    function confirmPassword() {
        if (process().PASSWORD === "dev" || value === process().PASSWORD) loggedin = true
    }

    // DEBUG
    // loggedin = true
</script>

<div class="center">
    <input type="password" bind:value on:change={confirmPassword} placeholder="Passord" />
    <button on:click={confirmPassword}>Logg in</button>
</div>

<style>
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    input,
    button {
        text-align: center;
        padding: 10px;
        background: none;
        color: var(--text);
        font-family: inherit;
        font-size: inherit;
        border: 3px solid rgb(255 255 255 / 0.3);
        transition: background-color 0.3s;
    }

    button {
        cursor: pointer;
    }

    input:focus,
    button:focus,
    button:hover {
        background-color: rgb(255 255 255 / 0.2);
    }

    button:active {
        background-color: rgb(255 255 255 / 0.1);
    }
</style>
