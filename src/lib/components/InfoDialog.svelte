<script lang="ts">
	import dialogOpen from '$lib/stores/infoDialogStore';
	import { clickOutside } from '$lib/actions/clickOutside';

	function handleCloseModal() {
		$dialogOpen = false;
	}
</script>

{#if $dialogOpen}
	<div
		class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-black/20 flex justify-center items-center"
	>
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto" use:clickOutside={handleCloseModal}>
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Help</h3>
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						on:click={handleCloseModal}
					>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						>
					</button>
				</div>
				<!-- Modal body -->
				<div class="p-6 space-y-6">
					<ol class="text-base leading-relaxed text-gray-500 dark:text-gray-400 list-decimal">
						<li>Navigate to the games folder.</li>
						<li>
							Find the save file in <code class="whitespace-pre overflow-x-scroll"
								>www/save/file1.rpgsave.</code
							>
						</li>
						<li>
							Drag and drop the save file over this window.
							<ul class="list-disc ml-4">
								<li>Repeat this with a new save to check your progress</li>
							</ul>
						</li>
						<li>
							Find the passive definition file in <code class="whitespace-pre overflow-x-scroll"
								>www/data/Skills.json</code
							>.
						</li>
						<li>
							Drag and drop the definition file over this window.
							<ul class="list-disc ml-4"><li>You only have to do this step once.</li></ul>
						</li>
						<li>
							If you wish to see the description as well, drag the <code
								class="whitespace-pre overflow-x-scroll">www/data/loc/RemDesc_EN.json</code
							> file over this window
						</li>
						<li>When finished, close this modal.</li>
					</ol>
				</div>
				<!-- Modal footer -->
				<div
					class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
				>
					<button
						data-modal-toggle="defaultModal"
						type="button"
						class="ml-auto text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
						on:click={handleCloseModal}>Close</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
