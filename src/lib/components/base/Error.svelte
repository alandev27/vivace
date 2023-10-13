<script lang="ts">
  import Info from "../icons/Info.svelte";
</script>

<div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <Info />
    <div>
      <span class="font-medium">Oops, something happened!</span> <slot />
    </div>
</div>