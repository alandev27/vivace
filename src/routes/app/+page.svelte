<script type="ts">
    import type { AppData } from '$lib/interface/RequestData';

    export let data: AppData;
</script>

<h1>Welcome back, {data.user.username}</h1>