export default function LeftNavigation() {
    return (
        <>
            <div className=" sidebar" role="navigation">
                <div className="navbar-collapse">
                    <nav className="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1">
                        <ul className="nav" id="side-menu">
                            <li>
                                <a href="index.html"><i className="fa fa-home nav_icon"></i>Dashboard</a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-cogs nav_icon"></i>Components <span className="nav-badge">12</span> <span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li>
                                        <a href="grids.html">Grid System</a>
                                    </li>
                                    <li>
                                        <a href="media.html">Media Objects</a>
                                    </li>
                                </ul>

                            </li>
                            <li className="">
                                <a href="#"><i className="fa fa-book nav_icon"></i>UI Elements <span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li>
                                        <a href="general.html">General<span className="nav-badge-btm">08</span></a>
                                    </li>
                                    <li>
                                        <a href="typography.html">Typography</a>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <a href="widgets.html"><i className="fa fa-th-large nav_icon"></i>Widgets <span className="nav-badge-btm">08</span></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-envelope nav_icon"></i>Mailbox<span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li>
                                        <a href="inbox.html">Inbox <span className="nav-badge-btm">05</span></a>
                                    </li>
                                    <li>
                                        <a href="compose.html">Compose email</a>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <a href="tables.html"><i className="fa fa-table nav_icon"></i>Tables <span className="nav-badge">05</span></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-check-square-o nav_icon"></i>Forms<span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li>
                                        <a href="forms.html">Basic Forms <span className="nav-badge-btm">07</span></a>
                                    </li>
                                    <li>
                                        <a href="validation.html">Validation</a>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <a href="#"><i className="fa fa-file-text-o nav_icon"></i>Pages<span className="nav-badge-btm">02</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li>
                                        <a href="login.html">Login</a>
                                    </li>
                                    <li>
                                        <a href="signup.html">SignUp</a>
                                    </li>
                                    <li>
                                        <a href="blank-page.html">Blank Page</a>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <a href="charts.html" className="chart-nav"><i className="fa fa-bar-chart nav_icon"></i>Charts <span className="nav-badge-btm pull-right">new</span></a>
                            </li>
                        </ul>
                        <div className="clearfix"> </div>

                    </nav>
                </div>
            </div>

            <div className="sticky-header header-section ">
                <div className="header-left">

                    <button id="showLeftPush"><i className="fa fa-bars"></i></button>

                    <div className="logo">
                        <a href="index.html">
                            <h1>NOVUS</h1>
                            <span>AdminPanel</span>
                        </a>
                    </div>

                    <div className="search-box">
                        <form className="input">
                            <input className="sb-search-input input__field--madoka" placeholder="Search..." type="search" id="input-31" />
                            <label className="input__label">
                                <svg className="graphic" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                                    <path d="m0,0l404,0l0,77l-404,0l0,-77z" />
                                </svg>
                            </label>
                        </form>
                    </div>
                    <div className="clearfix"> </div>
                </div>
                <div className="header-right">
                    <div className="profile_details_left">
                        <ul className="nofitications-dropdown">
                            <li className="dropdown head-dpdn">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-envelope"></i><span className="badge">3</span></a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <div className="notification_header">
                                            <h3>You have 3 new messages</h3>
                                        </div>
                                    </li>
                                    <li><a href="#">
                                        <div className="user_img"><img src="images/1.png" alt="" /></div>
                                        <div className="notification_desc">
                                            <p>Lorem ipsum dolor amet</p>
                                            <p><span>1 hour ago</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </a></li>
                                    <li className="odd"><a href="#">
                                        <div className="user_img"><img src="images/2.png" alt="" /></div>
                                        <div className="notification_desc">
                                            <p>Lorem ipsum dolor amet </p>
                                            <p><span>1 hour ago</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </a></li>
                                    <li><a href="#">
                                        <div className="user_img"><img src="images/3.png" alt="" /></div>
                                        <div className="notification_desc">
                                            <p>Lorem ipsum dolor amet </p>
                                            <p><span>1 hour ago</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </a></li>
                                    <li>
                                        <div className="notification_bottom">
                                            <a href="#">See all messages</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown head-dpdn">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-bell"></i><span className="badge blue">3</span></a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <div className="notification_header">
                                            <h3>You have 3 new notification</h3>
                                        </div>
                                    </li>
                                    <li><a href="#">
                                        <div className="user_img"><img src="images/2.png" alt="" /></div>
                                        <div className="notification_desc">
                                            <p>Lorem ipsum dolor amet</p>
                                            <p><span>1 hour ago</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </a></li>
                                    <li className="odd"><a href="#">
                                        <div className="user_img"><img src="images/1.png" alt="" /></div>
                                        <div className="notification_desc">
                                            <p>Lorem ipsum dolor amet </p>
                                            <p><span>1 hour ago</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </a></li>
                                    <li><a href="#">
                                        <div className="user_img"><img src="images/3.png" alt="" /></div>
                                        <div className="notification_desc">
                                            <p>Lorem ipsum dolor amet </p>
                                            <p><span>1 hour ago</span></p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </a></li>
                                    <li>
                                        <div className="notification_bottom">
                                            <a href="#">See all notifications</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown head-dpdn">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-tasks"></i><span className="badge blue1">15</span></a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <div className="notification_header">
                                            <h3>You have 8 pending task</h3>
                                        </div>
                                    </li>
                                    <li><a href="#">
                                        <div className="task-info">
                                            <span className="task-desc">Database update</span><span className="percentage">40%</span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="progress progress-striped active">
                                            <div className="bar yellow" style={{ width: '40%' }}></div>
                                        </div>
                                    </a></li>
                                    <li><a href="#">
                                        <div className="task-info">
                                            <span className="task-desc">Dashboard done</span><span className="percentage">90%</span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="progress progress-striped active">
                                            <div className="bar green" style={{ width: '90%' }}></div>
                                        </div>
                                    </a></li>
                                    <li><a href="#">
                                        <div className="task-info">
                                            <span className="task-desc">Mobile App</span><span className="percentage">33%</span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="progress progress-striped active">
                                            <div className="bar red" style={{ width: "33%" }}></div>
                                        </div>
                                    </a></li>
                                    <li><a href="#">
                                        <div className="task-info">
                                            <span className="task-desc">Issues fixed</span><span className="percentage">80%</span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="progress progress-striped active">
                                            <div className="bar  blue" style={{ width: "80%" }}></div>
                                        </div>
                                    </a></li>
                                    <li>
                                        <div className="notification_bottom">
                                            <a href="#">See all pending tasks</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="clearfix"> </div>
                    </div>

                    <div className="profile_details">
                        <ul>
                            <li className="dropdown profile_details_drop">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <div className="profile_img">
                                        <span className="prfil-img"><img src="images/a.png" alt="" /> </span>
                                        <div className="user-name">
                                            <p>Wikolia</p>
                                            <span>Administrator</span>
                                        </div>
                                        <i className="fa fa-angle-down lnr"></i>
                                        <i className="fa fa-angle-up lnr"></i>
                                        <div className="clearfix"></div>
                                    </div>
                                </a>
                                <ul className="dropdown-menu drp-mnu">
                                    <li> <a href="#"><i className="fa fa-cog"></i> Settings</a> </li>
                                    <li> <a href="#"><i className="fa fa-user"></i> Profile</a> </li>
                                    <li> <a href="#"><i className="fa fa-sign-out"></i> Logout</a> </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="clearfix"> </div>
                </div>
                <div className="clearfix"> </div>
            </div>
        </>
    )
}