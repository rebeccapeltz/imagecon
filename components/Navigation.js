import Link from 'next/link';

const Navigation = () => {
  const navItems = [
    {
      text: 'Images',
      icon: '🖼️',
      subItems: [
        {
          text: 'Upload Widget',
          href: '/upload-widget-demo',
        },
        {
          text: 'Upload via an API Endpoint',
          href: '/api-upload-demo',
        },
        {
          text: 'Image Gallery',
          href: '/image-gallery',
        },
      ],
    },
    {
      text: 'Videos',
      icon: '📹',
      subItems: [
        {
          text: 'Video Player',
          href: '/video-player-demo',
        },
        {
          text: 'Advanced Video Component',
          href: '/advanced-video',
        },
      ],
    },
  ];
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="bg-neutral menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 z-10"
          >
            {navItems.map((navItem, idx) => (
              <li key={idx}>
                <a>
                  {navItem.text} <span>{navItem.icon}</span>
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-neutral">
                  {navItem.subItems.map((subItem, idx) => (
                    <li key={idx}>
                      <Link href={subItem.href}>
                        <a>{subItem.text}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">ImageCon</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0  z-10">
          {navItems.map((navItem, idx) => (
            <li key={idx}>
              <a>
                {navItem.text} <span>{navItem.icon}</span>
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-neutral">
                {navItem.subItems.map((subItem, idx) => (
                  <li key={idx}>
                    <Link href={subItem.href}>
                      <a>{subItem.text}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
