<script lang="ts">
    import { onMount } from "svelte";

    export let target: string;
    export let attrs: string | undefined = undefined;
    
    if (!attrs) attrs = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  
</script>

<button data-modal-target={ `${target}Modal` } data-modal-toggle={ `${target}Modal` } class={ attrs } type="button">
    <slot />
 </button>