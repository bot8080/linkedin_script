// ==UserScript==
// @name         LinkedIn Job Description Copier with Precise Selectors
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Adds a button to copy the job description with company name and job designation on LinkedIn job search page using precise selectors
// @author       Your Name
// @match        https://www.linkedin.com/jobs/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Job details copied to clipboard');
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.innerText = message;
        notification.style.position = 'fixed';
        notification.style.top = '40px';
        notification.style.right = '10px';
        notification.style.padding = '10px';
        notification.style.backgroundColor = '#28a745';
        notification.style.color = '#fff';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '9999';
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function getCompanyName() {
        const companyElement = document.querySelector('.job-details-jobs-unified-top-card__company-name a');
        return companyElement ? companyElement.textContent.trim() : 'Unknown Company';
    }

    function getJobDesignation() {
        const titleElement = document.querySelector('.job-details-jobs-unified-top-card__job-title h1');
        return titleElement ? titleElement.textContent.trim() : 'Unknown Position';
    }

    function addCopyButton() {
        const jobDescriptionContainer = document.querySelector('article.jobs-description__container');
        const copyButtonContainer = document.querySelector('.display-flex.justify-space-between.flex-wrap.mt2');
        if (jobDescriptionContainer && copyButtonContainer) {
            const copyButton = document.createElement('button');
            copyButton.innerHTML = 'Copy Job Details';
            copyButton.style.margin = '10px';
            copyButton.className = 'artdeco-button artdeco-button--3 artdeco-button--primary';
            copyButton.addEventListener('click', function() {
                const companyName = getCompanyName();
                const jobDesignation = getJobDesignation();
                const jobDescription = jobDescriptionContainer.innerText;
                const textToCopy = `Company: ${companyName}\nJob Designation: ${jobDesignation}\n\n${jobDescription}`;
                copyToClipboard(textToCopy);
            });
            copyButtonContainer.appendChild(copyButton);
            clearInterval(intervalID);
        } else {
            console.log('Job Description Container or Copy Button Container not found yet.');
        }
    }

    const intervalID = setInterval(addCopyButton, 2000);
})();
