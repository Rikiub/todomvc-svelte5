<script lang="ts">
    import {
        all_todos,
        completed_todos,
        uncompleted_todos,
        Filters,
    } from "./store.svelte";
    import TodoItem from "./TodoItem.svelte";

    interface Props {
        filter: Filters;
    }
    const { filter = Filters.All }: Props = $props();

    const current = $derived.by(() => {
        switch (filter) {
            case Filters.All:
                return all_todos();
            case Filters.Active:
                return uncompleted_todos();
            case Filters.Completed:
                return completed_todos();
        }
    });
</script>

<section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        {#each current as todo}
            <li>
                <TodoItem {todo} />
            </li>
        {/each}
    </ul>
</section>
