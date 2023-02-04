<script lang="ts">
    import Editor from "$lib/admin/Editor.svelte"
    import Login from "$lib/admin/Login.svelte"

    let loggedin: boolean = false
</script>

<svelte:head>
    <title>Admin</title>
</svelte:head>

<main>
    {#if loggedin}
        <Editor />
    {:else}
        <Login bind:loggedin />
    {/if}
</main>

<style>
    :global(:root) {
        --primary: black;
        --text: white;
    }

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    main {
        width: 100vw;
        height: 100vh;
        background-color: var(--primary);
        color: var(--text);
        font-family: Roboto, "Segoe UI", Tahoma, sans-serif;
        font-size: 1.2em;
        overflow-y: auto;
    }
</style>
