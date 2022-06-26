<script lang="ts">
	export let name: string;
	export let obtained: boolean = false;
	export let obtainedOn: number | undefined;
	export let description: string | undefined = undefined;
</script>

<div class="max-w-sm min-h-full rounded overflow-hidden cursor-default bg-white shadow-lg">
	<div class="px-6 py-4">
		<div class="font-bold text-xl mb-2 flex flex-row columns-12">
			{name}

			<div class="float-right has-tooltip ml-auto flex items-start">
				<div>
					{#if obtained}
						<span class="tooltip rounded p-1 bg-black/90 text-white shadow-lg"
							>Obtained on day {obtainedOn}</span
						>
						<span>✔️</span>
					{:else}
						<span>❌</span>
					{/if}
				</div>
			</div>
		</div>

		<p class="text-gray-700 text-base">
			{#if description}
				{description}
			{:else}
				<span>Description unavailable</span>
			{/if}
		</p>
	</div>
</div>

<style>
	.tooltip {
		visibility: hidden;
		position: absolute;
		transform: translate(0, -2rem);
	}

	.has-tooltip:hover .tooltip {
		visibility: visible;
		z-index: 50;
	}
</style>
