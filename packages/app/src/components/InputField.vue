<template>
<div class="bg-blue-100 w-full h-full object-cover card bg-white shadow-2xl flex">
  <div class="container mx-auto mt-8">
	<div class="mx-auto flex flex-wrap max-width-form text-gray-800">
		<!-- Header	-->
		<div class="flex-100">
			<h1 class="font-bold text-3xl flex-100 mb-8">Gib mal nen neues Tier ein</h1>
		</div>
		<!--form-->
		<div class="flex flex-100 mt-8">
			<form class="flex-100">
				<!--inputs-->
				<div class="flex flex-100">
					<div class="flex-grow mr-2">
						<label class="block mb-1 font-bold" for="">Name</label>
						<input class="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner" type="text">
					</div>
					<div class="flex-grow ml-2">
						<label class="block mb-1 font-bold" for="">Rasse</label>
						<input class="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner" type="text">
					</div>
				</div>
				<div class="flex flex-100 mt-4">
					<div class="flex-grow mr-2">
						<label class="block mb-1 font-bold" for="">Geburstag</label>
						<input class="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner" type="date">
					</div>
				</div>
				
				<div class="flex flex-100 mt-4">
					<button class="bg-pink-dribbble flex-50 text-white relative py-4 rounded">
				<div>
					Speichern							
				</div>
			</button>
				</div>
			</form>
		</div>
  	</div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'inputField',
  data() {
    return {
    };
  },
});
</script>

<style lang="scss" scoped>
input::placeholder {
	color: #718096;
	font-weight: 300;
}

.flex-100 {
	flex: 0 1 100%;
}

.flex-50 {
	flex: 0 1 50%;
}

.max-width-form {
	max-width: 450px;
}

.checkbox {
	transform: scale(1.2);
}

.bg-blue-google {
	background-color: #4285F4;
}

.bg-pink-dribbble {
	background-color: #EA4C89;
}

.button-icon {
	position: absolute;
	left: 23px;
}
</style>