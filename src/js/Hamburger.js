/**
 * Hamburger Menu Controller
 */
export class Hamburger {
    constructor() {
        console.log('🔍 Hamburger.js iniciado');
        
        this.hamburgerBtn = document.getElementById('hamburger-btn');
        this.navMenus = document.querySelectorAll('.nav-menu');

        console.log('🔍 Hamburguer btn encontrado?', !!this.hamburgerBtn);
        console.log('🔍 Menus encontrados:', this.navMenus.length);

        if (!this.hamburgerBtn) {
            console.error('❌ ERRO: Hamburguer btn NÃO encontrado!');
            return;
        }

        this.init();
    }

    init() {
        console.log('🔗 Adicionando event listener ao hamburguer');
        
        this.hamburgerBtn.addEventListener('click', (e) => {
            console.log('✅ CLICK NO HAMBURGUER DISPAROU!');
            
            this.hamburgerBtn.classList.toggle('active');
            console.log('✅ Classe .active togada no btn:', this.hamburgerBtn.classList.contains('active'));
            
            this.navMenus.forEach((menu, idx) => {
                menu.classList.toggle('active');
                console.log(`✅ Menu ${idx} togado. Tem .active?`, menu.classList.contains('active'));
                console.log(`   Display CSS:`, window.getComputedStyle(menu).display);
            });
        });

        // Fechar ao clicar em link
        this.navMenus.forEach(menu => {
            menu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    console.log('✅ Click em link, fechando menu');
                    this.close();
                });
            });
        });
    }

    close() {
        this.hamburgerBtn.classList.remove('active');
        this.navMenus.forEach(menu => {
            menu.classList.remove('active');
        });
    }
}

