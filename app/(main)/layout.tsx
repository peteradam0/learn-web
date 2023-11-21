import MainHeader from "@/navigation/ui-adapter/main-navigation";
import SidebarContent from "@/navigation/ui-adapter/sidebar-content";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainHeader isAdmin={false} />
      <main>
        <aside className="bg-gray-800 text-white w-64 sidebarheight p-4 float-left">
          <nav>
            <ul className="space-y-2">
              <li className="opcion-con-desplegable">
                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    <span>Agenda</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
                <ul className="desplegable ml-4 hidden">
                  <li>
                    <a
                      href="#"
                      className="block p-2 hover:bg-gray-700 flex items-center"
                    >
                      <i className="fas fa-chevron-right mr-2 text-xs"></i>
                      Gestion de citas
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-2 hover:bg-gray-700 flex items-center"
                    >
                      <i className="fas fa-chevron-right mr-2 text-xs"></i>
                      Polizas
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      </main>
      <div style={{ marginLeft: "255px" }}>{children}</div>
    </div>
  );
}
