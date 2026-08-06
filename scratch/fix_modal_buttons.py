import re

filepath = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\src\components\AiModelGeneratorModal.jsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace export function signature to include currentUser default
content = content.replace(
    "export default function AiModelGeneratorModal({ isOpen, onClose, onSelectAndSaveModel, savedModels = [], onDeleteSavedModel }) {",
    "export default function AiModelGeneratorModal({ isOpen, onClose, onSelectAndSaveModel, savedModels = [], onDeleteSavedModel, currentUser = { email: 'master' } }) {"
)

# Pattern to find <button without type="button"
# We want to insert type="button" into <button ...>
def fix_button_tag(match):
    tag = match.group(0)
    if 'type=' not in tag:
        tag = tag.replace('<button', '<button type="button"', 1)
    return tag

content = re.sub(r'<button\b[^>]*>', fix_button_tag, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully added type='button' to all button tags in AiModelGeneratorModal.jsx!")
