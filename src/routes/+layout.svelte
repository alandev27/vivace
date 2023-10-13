<!-- COMPONENTS: Theme switcher, libs init -->

<script type="ts">
    import { initFlowbite } from 'flowbite';
    import { onMount } from 'svelte';

    import 'flowbite';
    import '../app.postcss';
    import 'flowbite/dist/flowbite.css';

    onMount(() => {
        initFlowbite();

        // DESC: Set theme
        let theme: string = localStorage.getItem('theme') ?? 'light';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.getElementById('home__theme-switcher')!.setAttribute('checked', 'checked');
        }
    });
</script>

<div>
    <slot />
</div>

<label class="fixed inline-flex items-center cursor-pointer bottom-7 right-9">
    <input type="checkbox" id="home__theme-switcher" class="sr-only peer" on:change={((event) => {
        let theme = localStorage.getItem('theme');

        if (theme === 'dark') {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        } else {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        }
    })}>
    <div class="w-14 h-7 bg-gray-100 shadow-md border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-700 after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white dark:after:bg-gray-800 dark:after:dark:text-gray-700 after:border after:border-gray-300 dark:after:border-gray-700 after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block text-gray-500 mb-[2px] ml-[7px] h-[15px] w-[15px] fill-current after:content-['']">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block float-right text-gray-500 mr-[6px] mt-[6px] h-[15px] w-[15px] fill-current after:content-['']">
            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
        </svg>          
          
    </div>
</label>