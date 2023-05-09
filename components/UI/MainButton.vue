<template>
    <button class="button-24" role="button">
        <slot></slot>
    </button>
</template>

<style scoped>
.button-24 {
    background: #f33f3f;
    border: 1px solid #f33f3f;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    line-height: 16px;
    min-height: 40px;
    outline: 0;
    padding: 12px 14px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    transition: .3s;
}

.button-24:hover,
.button-24:active {
    background-color: initial;
    background-position: 0 0;
    color: white;
}

.button-24:active {
    opacity: .5;
}
</style>