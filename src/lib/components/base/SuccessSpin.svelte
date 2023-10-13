<script>
    import Spinner from "../icons/Spinner.svelte";
</script>
<div class="flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    <Spinner />                    
    <div>
      <span class="font-medium">All done!</span> <slot />
    </div>
</div>