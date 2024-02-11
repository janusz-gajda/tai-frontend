<script setup lang="ts">
    import * as mmb from 'music-metadata-browser'
    function fileChanged(event: Event) {
        const target = event.target as HTMLInputElement
        if (target && target.files) {
            const files: FileList = target.files
            console.log(files)
            for (const file of files) {
                mmb.parseBlob(file).then((metadata: mmb.IAudioMetadata) => {
                    console.log(metadata)
                })
            }
        }
    }
</script>

<template>
    <main>
        <input multiple type="file" @change="fileChanged($event)" />
    </main>
</template>