<script setup>

</script>

<template>
    <div>
        <h2>관광지 탐색</h2>
    <div class="AreaSelect" >
        <div class="Select" >
            <select id="sido" >
                <option   value="">
                    시도선택
                </option>
            </select>
        </div>
        <div class="Select" >
            <select id="gugun" >
                <option   value="">
                    구군선택
                </option>
            </select>
        </div>
    </div>
    <div class="SearchFilter">
        <div class="SearchFilterRow">
            <button value="12" class="filterIcon">
                <div class="FilterIcon"><i class="fas fa-suitcase" style="color:#FE8C52"></i></div>
                <span>관광지</span>
            </button>
            <button value="32" class="filterIcon">
                <div class="FilterIcon"> <i class="fas fa-hotel" style="color:#FE8C52"></i></div>
                <span>
                    숙박
                </span>
            </button>
            <button value="39" class="filterIcon">
                <div class="FilterIcon"><i class="fas fa-utensils" style="color:#D971DB"></i></div>
                <span>
                    음식점
                </span>
            </button>
            <button value="14" class="filterIcon">
                <div class="FilterIcon"><i class="fas fa-ticket-alt" style="color:#5E9BF3"></i></div>
                <span>
                    문화시설
                </span>
            </button>
        </div>
        <div  class="SearchFilterRow">
            <button value="15" class="filterIcon">
                <div class="FilterIcon"><i class="fas fa-ticket-alt" style="color:#03C75A ;"></i></div>
                <span>
                  
                    공연
                </span>
            </button>
            <button value="25" class="filterIcon">
                <div class="FilterIcon"><i class="fas fa-map-signs" style="color:#FFB21F"></i></div>
                <span>여행코스</span>
            </button>
            <button value="38" class="filterIcon">
                <div class="FilterIcon"><i class="fas fa-shopping-bag" style="color:#FFB21F"></i></div>
                <span>쇼핑</span>
            </button>
        </div>
    </div>
    </div>
</template>

<style scoped>

</style>