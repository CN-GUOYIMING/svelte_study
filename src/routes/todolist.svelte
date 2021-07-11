<script>
  let todoList = [];
  let inputValue = '';

  const add = (newValue) => {
    if (newValue !== '') {
      todoList = [...todoList, newValue];
      return;
    }
  };

  const remove = (targetIndex) => {
    todoList = todoList.filter((item, index) => index !== targetIndex);
  };

  const handlePress = (event) => {
    if (event.key === 'Enter') {
      return add(inputValue);
    } else {
      return;
    }
  }
</script>

<main>
  <section>
    <h2>TODO LIST</h2>
    
    <input 
      type="text" 
      bind:value={inputValue}
      on:keydown={event => handlePress(event)}
    />
    
    <button 
      type="button" 
      on:click={() => add(inputValue)}  
    >
      Add
    </button>
  </section>

  <section class="list">
    {#if todoList.length === 0}
      Please Add Todo Item.
    {/if}

    {#each todoList as item, index }
      <section on:click={() => remove(index)}>
        <span>{item}</span>
      </section>
    {/each}
  </section>
</main>

<style>
main {
  display: flex;
  flex-direction: column;
}
.list {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
</style>