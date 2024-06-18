<template>
  <div class="stats-widget">
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  count: Number
});
</script>

<style scoped>
.stats-widget {
  width: 90%;
  align-self:center;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #f0f4f8, #cfe0e8);
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial, sans-serif';
  color: #333;
}

.stats-widget h1 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #000000;
  font-weight:bold;
}

.stats-widget p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #666;
  text-align: left;
}
</style>
