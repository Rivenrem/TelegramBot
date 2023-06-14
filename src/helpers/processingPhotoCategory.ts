export default function processingPhotoCategory(category: string): string {
    if (category === 'cat' || category === 'dog') {
        return category === 'cat' ? 'kitty' : 'puppy';
    }
    return category;
}
