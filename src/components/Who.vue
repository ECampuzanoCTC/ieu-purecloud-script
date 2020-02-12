<template>
    <div class="mt-2 mb-5">
        <p class="text-center mb-0">
            <v-icon 
            color="#E94433"
             size="200">
                mdi-face-agent
            </v-icon>
        </p>

        <h1 class="text-center" style="color:#E94433;">
            {{ telefono }}
        </h1>
    </div>
</template>
<script>
export default {
    name:"who-component",
    props:[
        'telefono'
    ]
}
</script>
<style lang="scss" scoped>

</style>