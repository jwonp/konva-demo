import LeftSideBar from "./LeftSideBar";

type BaseLayoutProps = {
  children: React.ReactNode;
};
const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="w-full h-full">
      <nav className=" bg-green-950 h-12">
        <div className="flex gap-2 p-2">
          <div>
            <a href="/">
              <img
                src="logo192.png"
                alt=""
                width={32}
                height={32}
              />
            </a>
          </div>
          <div>
            <a href="/assets">
              <p className="text-white hover:text-green-500 leading-8 ">
                Assets
              </p>
            </a>
          </div>
        </div>
      </nav>
      <div className="flex w-screen h-[calc(100%-3rem)]">
        <aside className="w-[240px] h-full border">
          <LeftSideBar />
        </aside>
        <main className="w-[calc(100%-240px)] h-full border">{children}</main>
      </div>
    </div>
  );
};

export default BaseLayout;
