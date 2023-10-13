<script lang="ts">
    import Sidebar from '$lib/components/app/Sidebar.svelte';
    import type { AppData } from '$lib/interface/RequestData';

    export let data: AppData;
</script>

<Sidebar user={ data.user }/>
<section class="ml-64 w-[calc(100%-16rem)] h-[100vh] p-8 bg-white dark:bg-gray-900">
    <slot />
</section>