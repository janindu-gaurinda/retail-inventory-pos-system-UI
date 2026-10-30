/**
 * ============================================================================
 * FILE PATH: public/assets/js/ism-admin.js
 * DESCRIPTION: Shared Global JavaScript for ISM System Layout & Pages
 *              (Mobile Sidebar Toggle, Auto SKU/Barcode Generators, etc.).
 * ============================================================================
 *
 * CONNECTED LAYOUT & VIEWS:
 * - Master Layout: resources/views/layouts/admin.blade.php
 * - Sidebar Partial: resources/views/partials/sidebar.blade.php
 * - Navbar Partial: resources/views/partials/navbar.blade.php
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
    /*
    |--------------------------------------------------------------------------
    | PART 1: Mobile Sidebar Drawer Toggle Logic
    |--------------------------------------------------------------------------
    */
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');

    function toggleSidebar(show) {
        if (!sidebar || !sidebarOverlay) return;
        if (show) {
            sidebar.classList.add('show');
            sidebarOverlay.classList.remove('d-none');
        } else {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.add('d-none');
        }
    }

    if (openSidebarBtn) openSidebarBtn.addEventListener('click', () => toggleSidebar(true));
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
});

/*
|--------------------------------------------------------------------------
| PART 2: Shared SKU & Barcode Auto-Generator Helpers
|--------------------------------------------------------------------------
*/
function generateSku(inputId) {
    const el = document.getElementById(inputId);
    if (!el) return;
    const rand = Math.floor(1000 + Math.random() * 9000);
    el.value = 'ISM-PHN-' + rand;
    el.dispatchEvent(new Event('input'));
}

function generateBarcode(inputId) {
    const el = document.getElementById(inputId);
    if (!el) return;
    const rand = Math.floor(100000 + Math.random() * 900000);
    el.value = '8901041' + rand;
    el.dispatchEvent(new Event('input'));
}

/*
|--------------------------------------------------------------------------
| PART 3: Static UI Flash Alert Helper (Replaces Backend Session Flash)
|--------------------------------------------------------------------------
*/
function showStaticAlert(message, type = 'success') {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const existing = document.getElementById('staticFlashAlert');
    if (existing) existing.remove();

    const icon = type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill';
    const alertDiv = document.createElement('div');
    alertDiv.id = 'staticFlashAlert';
    alertDiv.className = `alert alert-${type} alert-dismissible fade show d-flex align-items-center gap-2 py-2 px-3 mb-3 rounded-3 shadow-sm no-print`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        <i class="bi ${icon} fs-5"></i>
        <div class="small fw-medium">${message}</div>
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    mainEl.insertBefore(alertDiv, mainEl.firstChild);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

