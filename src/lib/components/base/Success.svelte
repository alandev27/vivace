<script>
    import { onMount } from "svelte";
    import Info from "../icons/Info.svelte";

    let id = (new Date()).getMilliseconds().toString();
    onMount(() => {
        document.getElementById(`close-alert-${id}`)?.addEventListener('click', () => {
            document.getElementById(`alert-${id}`)?.classList.add('hidden');
        })
    })
</script>
<div id={ `alert-${id}` } class="flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    <Info />                    
    <div>
      <span class="font-medium">All done!</span> <slot />
    </div>
    <button id={ `close-alert-${id}` } type="button" class="ml-auto -mx-1.5 -my-1.5 text-green-800 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>