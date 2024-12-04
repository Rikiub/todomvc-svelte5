<script lang="ts">
    import { TodoBase } from "./store.svelte";
    import * as store from "./store.svelte";

    interface Props {
        todo: TodoBase;
    }
    const { todo }: Props = $props();

    // State
    function handleKey(event) {
        if (event.key === "Enter" || event.key === "Escape") {
            disableEdit();
        }
    }

    let editable = $state(false);
    function enableEdit() {
        editable = true;
    }
    function disableEdit() {
        editable = false;
    }
</script>

<li class:completed={todo.completed} class:editing={editable}>
    {#if editable}
        <input
            class="edit"
            onblur={disableEdit}
            onkeydown={handleKey}
            bind:value={todo.description}
        />
    {:else}
        <div class="view">
            <input
                type="checkbox"
                class="toggle"
                checked={todo.completed}
                onchange={() => (todo.completed = !todo.completed)}
            />

            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label ondblclick={enableEdit}>
                {todo.description}
            </label>

            <button
                aria-label="Close"
                class="destroy"
                onclick={() => store.remove(todo.id)}
            ></button>
        </div>
    {/if}
</li>
