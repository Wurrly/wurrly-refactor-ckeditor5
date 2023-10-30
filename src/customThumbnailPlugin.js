export const customThumbnailPlugin = (editor) => {
    editor.model.schema.extend('$text', { allowAttributes: ['videoUrl', 'thumbnailUrl'] });

    editor.conversion.for('downcast').add(dispatcher => {
        dispatcher.on('insert:$text', (evt, data, conversionApi) => {
            const videoUrl = data.item.getAttribute('videoUrl');
            const thumbnailUrl = data.item.getAttribute('thumbnailUrl');
            if (!videoUrl || !thumbnailUrl) return;

            const viewWriter = conversionApi.writer;
            const videoElement = viewWriter.createContainerElement('video', { src: videoUrl, poster: thumbnailUrl });
            const figureElement = viewWriter.createContainerElement('figure', { class: 'media' });

            viewWriter.insert(viewWriter.createPositionAt(figureElement, 0), videoElement);
            conversionApi.mapper.bindElements(data.item, figureElement);
            viewWriter.insert(conversionApi.mapper.toViewPosition(data.range.start), figureElement);
        });
    });
}