<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import 'flowbite/dist/flowbite.css';
	import { browser } from '$app/env';
</script>

<svelte:head>
	<link rel="preload" as="image" href="file-upload.png" />
	<title>Karryn's Prison Passive Helper</title>
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
</svelte:head>

<div class="flex flex-col h-screen">
	<Header />
	{#if browser}
		<slot />
	{/if}
</div>

<style>
	:global(html, body) {
		min-height: 100vh;
	}
</style>
