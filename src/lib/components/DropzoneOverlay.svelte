<script lang="ts">
	import { fade } from 'svelte/transition';
	import { portal } from 'svelte-portal';
	import DropzoneIcon from '$lib/components/DropzoneIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	interface UploadEvent {
		file: File;
	}

	interface Events {
		upload: UploadEvent;
	}

	const dispatch = createEventDispatcher<Events>();

	let dragging = false;

	function handleDragStart(event: DragEvent) {
		event.stopPropagation();
		event.stopImmediatePropagation();
		dragging = true;
	}

	function handleDragEnd(event: DragEvent) {
		event.stopPropagation();
		event.stopImmediatePropagation();
		dragging = false;
	}

	function handleDragOver(event: DragEvent) {
		event.stopPropagation();
		event.stopImmediatePropagation();
		event.preventDefault();
		dragging = true;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragging = false;

		let dt = event.dataTransfer;

		if (!dt) return;

		let files = dt.files;
		Array.from(files).forEach((file) => {
			dispatch('upload', { file });
		});
	}
</script>

<svelte:body
	on:dragenter={handleDragStart}
	on:dragleave={handleDragEnd}
	on:dragover={handleDragOver}
	on:drop={handleDrop} />

{#if dragging}
	<div
		use:portal
		class="absolute w-screen h-screen bg-gray-500/30 left-0 top-0 flex flex-col items-center justify-center pointer-events-none"
		transition:fade={{ duration: 100 }}
	>
		<DropzoneIcon class="invert max-w-40 max-h-40 flex" />
		<h3 class="text-white m-3 text-lg">Drop item to process</h3>
	</div>
{/if}
