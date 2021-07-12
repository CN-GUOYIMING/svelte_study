<script>
  import { onMount } from 'svelte';
  import { equipmentType } from './store'
  // 4. 嵌套組件
  import Icon from '../../../src/components/gensin/Icon.svelte';

  // 1. 添加數據
  let name = '芭芭拉';
  let src = 'images/barbara.png';
  let alt = 'barbara';
  const iconInfo = { src: "images/barbara_icon.png" }
  let description = "<p>她是西風教會的牧師</p>"; // 5. HTML 標簽
  let isShowDescription = true;
  let isShowDetail = true;
  let equipmentTypeValue = 0;
  let equipments = [];

  const unsubsrcibe = equipmentType.subscribe(value => {
    equipmentTypeValue = value;
  })

  $: switch (equipmentTypeValue) {
    case 0:
      equipments[0] = {
        title: '武器', 
        name: '嘟嘟可故事集', 
        isChecked: false
      };
      
      equipments[1] = { 
        title: '聖遺物', 
        name: '樂團套',
        isChecked: false
      };
     
      break;

    case 1:
      equipments[0] = { 
        title: '武器', 
        name: '萬國諸海圖譜',
        isChecked: false
      };
      
      equipments[1] = { 
        title: '聖遺物', 
        name: '少女套',
        isChecked: false
      };
      
      break;
  }

  let selectedEquipments = [];

  const getStyleByIsShow = (isShow) => {
    return isShow ? 'display: block' : 'display: none';
  };

  $: detailStyle = getStyleByIsShow(isShowDetail);
  $: descriptionStyle = getStyleByIsShow(isShowDescription);

  // Functions
  const handleClick = () => {
    isShowDescription = !isShowDescription;
  };
  
  /**
   * 7. 響應式聲明
   * 
   * 注意：由于 Svelte 的反应性是由赋值语句触发的，
   *   因此使用数组的诸如 push 和 splice 之类的方法就不会触发自动更新。
   *   可以使用"[...]"來解決。
   */
  // 8. 響應式聲明語句
  $: console.log(`the descriptionStyle is ${descriptionStyle}`);
  // $: {
  //   console.log(`the count is ${count}`);
  //   console.log(`the count doubled is ${doubled}`);
  // }

  // 15. 生命周期
  let photos;
  onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
	});

  /**
   * 16. Store
   * - 使用 writable 定義
   * - 調取 store 對象的 subsrcibe 可以監聽變化
   * - set, update 可以修改 store 對象的值
   * - 應該在 onDestory 周期中 使用 unsubsrcibe 取消訂閱
   * - 可以使用 $ 自動訂閱 
   */
</script>

<section>
  <h2>{name}</h2>

  <!-- 10. 使用“{...變量}”傳播對象形式的屬性到組件上 -->
  <!-- 13 - 1 自定義組件自定義事件
    - 組件外調度組件内事件：組件内事件綁定的方法需要調用 createEventDispatcher() 方法
    創建 dispatch('自定義事件名', detail) 方法。
    - 自定義事件不會冒泡，深層監聽需要轉發：不向事件賦值即可轉發。
  -->
  <Icon 
    {...iconInfo} 
    on:click={(event) => console.log(event.detail.text)}
  />
  
  <!-- 2. 動態屬性 -->
  <img {src} alt={alt}>
</section>

<!-- 6. 響應式 -->
<!-- 13. 綁定事件
    - on:事件名
    - 可以使用箭頭函數傳參
    - 事件修飾符，如：on:click|once
  -->
<section style={detailStyle}>
  <button type="button" on:click={handleClick}>
    點撃此處
    
    <!-- 11. 條件 -->
    {#if isShowDescription}
      隠藏
    {:else}
      顯示
    {/if}
    
    說明
  </button>

  <div style={descriptionStyle}>
    {@html description}
  </div>
</section>

<!-- 14.綁定
    - 可以使用"bind:value={name}"來實現"on:input={event => name = event.target.value}"
    - 組綁定：bind:groug，同一組的單選框互斥；同一組的複選框成爲數組
  -->
<section>
  <h3>選擇出裝</h3>
  
  <!-- <label for="equipment_dps" on:click={() => equipmentType = 0}> -->
  <label for="equipment_dps" on:click={() => equipmentType.set(0)}>
    <input type="radio" 
      name="equipment_dps" 
      value={0}
      bind:group={equipmentTypeValue}
    />
    輸出裝
  </label>

  <!-- <label for="equipment_healer" on:click={() => equipmentType = 1}> -->
  <label for="equipment_healer" on:click={() => equipmentType.set(1)}>
    <input type="radio" 
      name="equipment_healer" 
      value={1}
      bind:group={equipmentTypeValue}
    />
    奶裝
  </label>

  <br />
  <hr />

  {#each equipments as item, index (item.title)}
    {#if index === 1}
      <br />
    {/if}

    <label 
      for={item.title} 
      on:click={() => item.isChecked = !item.isChecked}
    >
      <input 
        type="checkbox" 
        name={item.title} 
        value={item.name}
        bind:group={selectedEquipments}
        bind:checked={item.isChecked} 
      />
      
      {item.title}：
    </label>

    {#if item.isChecked}
      <span>{item.name}</span>
    {/if}
  {/each}
</section>

<!-- 3. CSS 樣式 -->
<style>
  img {
    height: 200px;
  }

  section {
    margin-top: 10px;
  }
</style>
