// Simple Content Editor for ICSSII 2026
// This script provides basic content editing functionality

class ContentEditor {
    constructor() {
        this.init();
    }

    init() {
        this.createEditButtons();
        this.loadContent();
        this.bindEvents();
    }

    createEditButtons() {
        // Create floating edit button
        const editButton = document.createElement('button');
        editButton.id = 'content-editor-toggle';
        editButton.innerHTML = '✏️ Edit';
        editButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-green);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            box-shadow: var(--shadow-card);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(editButton);

        // Create edit panel
        const editPanel = document.createElement('div');
        editPanel.id = 'content-editor-panel';
        editPanel.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: var(--shadow-elevated);
            padding: 20px;
            width: 300px;
            max-height: 400px;
            overflow-y: auto;
            display: none;
            z-index: 1000;
        `;
        editPanel.innerHTML = `
            <h3 style="margin-top: 0; color: var(--primary-green);">Content Editor</h3>
            <div id="editable-elements"></div>
            <button id="save-changes" style="width: 100%; margin-top: 15px; padding: 10px; background: var(--primary-green); color: white; border: none; border-radius: 6px; cursor: pointer;">Save Changes</button>
        `;
        document.body.appendChild(editPanel);
    }

    loadContent() {
        // Load editable content from data files
        this.loadConferenceData();
        this.loadNavigationData();
    }

    async loadConferenceData() {
        try {
            const response = await fetch('/_data/conference.yml');
            const data = await response.text();
            this.conferenceData = this.parseYAML(data);
        } catch (error) {
            console.log('Conference data not available, using fallback');
            this.conferenceData = {};
        }
    }

    async loadNavigationData() {
        try {
            const response = await fetch('/_data/navigation.yml');
            const data = await response.text();
            this.navigationData = this.parseYAML(data);
        } catch (error) {
            console.log('Navigation data not available, using fallback');
            this.navigationData = {};
        }
    }

    parseYAML(yamlString) {
        // Simple YAML parser for basic structures
        const lines = yamlString.split('\n');
        const result = {};
        let currentObject = result;
        let indentStack = [];

        lines.forEach(line => {
            if (line.trim() === '' || line.startsWith('#')) return;

            const indent = line.length - line.trimStart().length;
            const trimmed = line.trim();

            // Handle different YAML structures
            if (trimmed.includes(':')) {
                const [key, ...valueParts] = trimmed.split(':');
                const value = valueParts.join(':').trim();

                if (value === '') {
                    // Object start
                    currentObject[key] = {};
                    indentStack.push({indent, object: currentObject});
                    currentObject = currentObject[key];
                } else {
                    // Simple value
                    currentObject[key] = value.replace(/^["']|["']$/g, '');
                }
            } else if (trimmed.startsWith('- ')) {
                // Array item
                if (!Array.isArray(currentObject)) {
                    const lastKey = Object.keys(indentStack[indentStack.length - 1]?.object || {})[0];
                    if (lastKey) {
                        indentStack[indentStack.length - 1].object[lastKey] = [];
                        currentObject = indentStack[indentStack.length - 1].object[lastKey];
                    }
                }
                currentObject.push(trimmed.substring(2));
            }
        });

        return result;
    }

    bindEvents() {
        const toggleBtn = document.getElementById('content-editor-toggle');
        const panel = document.getElementById('content-editor-panel');
        const saveBtn = document.getElementById('save-changes');

        toggleBtn.addEventListener('click', () => {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            this.showEditableElements();
        });

        saveBtn.addEventListener('click', () => {
            this.saveChanges();
        });
    }

    showEditableElements() {
        const container = document.getElementById('editable-elements');
        container.innerHTML = '';

        // Add conference info editing
        if (this.conferenceData) {
            container.innerHTML += `
                <div style="margin-bottom: 15px;">
                    <h4 style="margin: 0 0 10px 0; color: var(--primary-green);">Conference Info</h4>
                    <label>Conference Name:</label>
                    <input type="text" id="edit-conference-name" value="${this.conferenceData.name || ''}" style="width: 100%; margin-bottom: 8px; padding: 5px;">
                    <label>Description:</label>
                    <textarea id="edit-conference-description" style="width: 100%; height: 60px; margin-bottom: 8px; padding: 5px;">${this.conferenceData.description || ''}</textarea>
                </div>
            `;
        }

        // Add navigation editing
        if (this.navigationData?.items) {
            container.innerHTML += `
                <div>
                    <h4 style="margin: 0 0 10px 0; color: var(--primary-green);">Navigation</h4>
                    <div id="nav-items"></div>
                </div>
            `;

            const navContainer = document.getElementById('nav-items');
            this.navigationData.items.forEach((item, index) => {
                navContainer.innerHTML += `
                    <div style="margin-bottom: 8px; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        <input type="text" id="nav-title-${index}" value="${item.title}" placeholder="Title" style="width: 45%; margin-right: 5%;">
                        <input type="text" id="nav-url-${index}" value="${item.url}" placeholder="URL" style="width: 45%;">
                    </div>
                `;
            });
        }
    }

    async saveChanges() {
        // Collect form data
        const conferenceName = document.getElementById('edit-conference-name')?.value;
        const conferenceDesc = document.getElementById('edit-conference-description')?.value;

        // Update conference data
        if (conferenceName) {
            this.conferenceData.name = conferenceName;
        }
        if (conferenceDesc) {
            this.conferenceData.description = conferenceDesc;
        }

        // Update navigation data
        if (this.navigationData?.items) {
            this.navigationData.items.forEach((item, index) => {
                const title = document.getElementById(`nav-title-${index}`)?.value;
                const url = document.getElementById(`nav-url-${index}`)?.value;
                if (title) item.title = title;
                if (url) item.url = url;
            });
        }

        // Save to localStorage for demo purposes
        localStorage.setItem('conferenceData', JSON.stringify(this.conferenceData));
        localStorage.setItem('navigationData', JSON.stringify(this.navigationData));

        alert('Changes saved! (Note: This is a demo. In production, changes would be saved to your CMS.)');

        // Hide panel
        document.getElementById('content-editor-panel').style.display = 'none';
    }
}

// Initialize content editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContentEditor();
});
