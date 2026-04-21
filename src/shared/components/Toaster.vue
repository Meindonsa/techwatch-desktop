<script setup lang="ts">
import useToasterStore, { type TToastStatus } from '@/core/stores/UseToasterStore.ts'

const toastStore = useToasterStore()

const toastClassMap: Record<TToastStatus, string> = {
  warning: 'warning',
  error: 'error',
  success: 'success',
  info: 'info',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="toastStore.toasts.length" class="toaster__wrapper">
        <TransitionGroup name="toast" tag="ul">
          <li
            v-for="toast in toastStore.toasts"
            :class="['toaster__inner', toastClassMap[toast.status]]"
            :key="toast.text"
          >
            <span class="toaster__inner-text">
              {{ toast.text }}
            </span>
          </li>
        </TransitionGroup>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.toaster__wrapper {
  position: fixed;
  bottom: 2%;
  right: 3%;

  z-index: 1000;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toaster__inner {
  --color: black;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 1rem;

  border-radius: 0.3rem;

  border: 0;

  background-color: var(--color);

  padding: 0.8rem 2.2rem;
  color: #fff;
  &.success {
    --color: green;
  }
  &.warning {
    --color: orange;
  }
  &.error {
    --color: red;
  }
  &.info {
    --color: #1a68f3;
  }
  &-icon {
    width: 1.8rem;
    aspect-ratio: 1/1;
  }

  &-text {
    font-size: 1.6rem;
    font-weight: 600;
  }
}
</style>
