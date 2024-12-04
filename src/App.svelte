<script lang="ts">
	import TodoList from "./TodoList.svelte";
	import { Filters } from "./store.svelte";
	import * as store from "./store.svelte";

	function handleNewTodo(event) {
		if (event.key === "Enter") {
			let value = event.target.value;

			if (value) {
				store.add({
					id: crypto.randomUUID(),
					description: value,
					completed: false,
				});

				event.target.value = "";
			}
		}
	}

	let currentFilter: Filters = $state(Filters.All);

	function updateView() {
		switch (location.hash) {
			case "#/active":
				currentFilter = Filters.Active;
				break;
			case "#/completed":
				currentFilter = Filters.Completed;
				break;
			default:
				currentFilter = Filters.All;
				break;
		}
	}

	$effect(() => {
		store.save_todos();
	});
</script>

<svelte:window on:hashchange={updateView} />

<section class="todoapp">
	<header class="header">
		<h1>todos</h1>
		<input
			class="new-todo"
			type="text"
			placeholder="What needs to be done?"
			onkeydown={handleNewTodo}
		/>
	</header>

	<!-- This section should be hidden by default and shown when there are todos -->
	{#if store.all_todos().length != 0}
		<section class="main">
			<input
				id="toggle-all"
				class="toggle-all"
				type="checkbox"
				onclick={() => store.toggle_all()}
			/>
			<label for="toggle-all"> Mark all as complete </label>
			<ul class="todo-list">
				<!-- These are here just to show the structure of the list items -->
				<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
				<TodoList filter={currentFilter} />
			</ul>
		</section>

		<!-- This footer should be hidden by default and shown when there are todos -->
		<footer class="footer">
			<!-- This should be `0 items left` by default -->
			<span class="todo-count">
				<strong>{store.uncompleted_todos().length}</strong> item left
			</span>

			<!-- Remove this if you don't implement routing -->
			<ul class="filters">
				<li>
					<a class:selected={currentFilter === Filters.All} href="#/">
						All
					</a>
				</li>
				<li>
					<a
						class:selected={currentFilter === Filters.Active}
						href="#/active"
					>
						Active
					</a>
				</li>
				<li>
					<a
						class:selected={currentFilter === Filters.Completed}
						href="#/completed"
					>
						Completed
					</a>
				</li>
			</ul>

			<!-- Hidden if no completed items are left ↓ -->
			{#if store.completed_todos().length > 0}
				<button
					class="clear-completed"
					onclick={() => store.remove_all_completed()}
				>
					Clear completed
				</button>
			{/if}
		</footer>
	{/if}
</section>

<footer class="info">
	<p>Double-click to edit a todo</p>
	<!-- Change this out with your name and url ↓ -->
	<p>Created by <a href="http://github.com/Rikiub">Rikiub%</a></p>
	<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
</footer>
