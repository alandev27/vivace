<script lang="ts">
    import type { AppData } from '$lib/interface/RequestData';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export let data: AppData;

    onMount(() => {
        goto(`/app/my-files/${data.user.root}`);
    });
</script>