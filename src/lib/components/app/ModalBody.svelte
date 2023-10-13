<script lang="ts">
    import { onMount } from "svelte";

    export let target: string;
</script>

<div id={ `${target}Modal` } tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative w-full h-full max-w-md md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <slot />
        </div>
    </div>
</div>

