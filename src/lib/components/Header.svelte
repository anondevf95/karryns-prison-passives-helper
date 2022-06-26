<script>
	import QuestionIcon from './QuestionIcon.svelte';
	import infoDialogOpen from '$lib/stores/infoDialogStore';
</script>

<nav class="flex items-center justify-between flex-wrap bg-purple-700 p-4">
	<div class="flex items-center flex-shrink-0 text-white mr-6">
		<span class="font-semibold text-xl tracking-tight">Karryn's Prison Passive Helper</span>
	</div>

	<div
		class="block text-white p-2 rounded cursor-pointer hover:bg-purple-900 transition-colors"
		on:click={() => ($infoDialogOpen = true)}
	>
		<QuestionIcon size="lg" />
	</div>
</nav>
