\# IPL Season 19 Analytics Dashboard



\## Interactive Cricket Analytics and Visualization Platform



IPL Season 19 Analytics Dashboard is a web-based analytics platform built to visualize IPL match, team, player, and performance statistics.



The dashboard uses PHP, MySQL, JavaScript, and Chart.js to transform cricket data into interactive statistics, charts, team insights, and downloadable Excel reports.



\## Features



\* IPL match statistics dashboard

\* Team performance analysis

\* Player statistics and insights

\* Interactive Chart.js visualizations

\* Runs distribution analysis

\* Over-by-over analysis

\* Match and performance statistics

\* Team details modal

\* Dynamic data loaded through PHP APIs

\* Professional multi-sheet Excel report

\* Excel export with formatted tables and KPIs

\* Responsive dashboard interface



\## Analytics



The dashboard provides insights such as:



\* Total matches

\* Total overs

\* Total runs

\* Wickets

\* Sixes and fours

\* 3s, 2s and 1s

\* Dot balls

\* Overthrow runs

\* Team performance

\* Run distribution

\* Over analysis

\* Player and match statistics



\## Technology Stack



\### Frontend



\* HTML5

\* CSS3

\* JavaScript

\* Fetch API

\* Chart.js

\* Font Awesome



\### Backend



\* PHP

\* PHP PDO

\* REST-style API endpoints



\### Database



\* MySQL

\* SQL

\* Relational data structure



\### Data Export



\* XLSX / xlsx-js-style

\* Microsoft Excel compatible reports



\### Development Environment



\* XAMPP

\* Apache

\* MySQL



\## Project Architecture



```text

User Interface

&#x20;     |

&#x20;     v

HTML + CSS + JavaScript

&#x20;     |

&#x20;     +------> Chart.js

&#x20;     |

&#x20;     +------> Excel Export

&#x20;     |

&#x20;     v

PHP API Layer

&#x20;     |

&#x20;     +------> get\_stats.php

&#x20;     |

&#x20;     +------> get\_charts.php

&#x20;     |

&#x20;     v

MySQL Database

```



\## Project Structure



```text

ipl analysis/

│

├── api/

│   ├── db.php

│   ├── get\_charts.php

│   └── get\_stats.php

│

├── css/

│   └── style.css

│

├── database/

│   ├── init.sql

│   ├── ipl\_analytics.sql

│   └── milesweb\_import.sql

│

├── images/

│

├── js/

│   ├── app.js

│   ├── charts.js

│   ├── export.js

│   └── team\_modal.js

│

├── index.html

├── reference.html

├── reference.css

├── reference.js

└── sso-login.php

```



\## How It Works



1\. The user opens the analytics dashboard.

2\. JavaScript requests statistics from the PHP API.

3\. PHP communicates with the MySQL database.

4\. Statistical data is returned as JSON.

5\. JavaScript displays KPIs and analytics.

6\. Chart.js generates interactive visualizations.

7\. Users can explore team and performance information.

8\. The dashboard can generate a professional Excel analytics report.



\## API Endpoints



\### Statistics API



```text

api/get\_stats.php

```



Provides dashboard-level statistical information.



\### Charts API



```text

api/get\_charts.php

```



Provides data used for analytical charts such as run distribution and over analysis.



\## Excel Report



The dashboard includes a professional Excel export feature.



The generated workbook contains multiple analytical sheets with:



\* KPIs

\* Match statistics

\* Team analysis

\* Player statistics

\* Performance data

\* Formatted tables

\* Machine-readable data



The exported workbook can be opened in Microsoft Excel and can also be used with tools such as Power BI, Tableau, Python, and Excel Power Query.



\## Installation



\### Requirements



\* XAMPP

\* Apache

\* MySQL

\* PHP 7+ / PHP 8+

\* Modern web browser



\### Setup



1\. Clone or download the repository.

2\. Place the project inside the XAMPP `htdocs` folder.

3\. Start Apache and MySQL from XAMPP.

4\. Create a MySQL database.

5\. Import the required SQL file from the `database` folder.

6\. Configure the local database connection.

7\. Open the dashboard in your browser.



```text

http://localhost/projects/ipl%20analysis/

```



\## Security



Database credentials are kept outside the public repository.



Local configuration files containing database credentials are excluded through `.gitignore`.



The repository is prepared so that private database credentials are not committed to GitHub.



\## Learning Outcomes



This project provided practical experience in:



\* PHP and MySQL integration

\* PDO database connectivity

\* REST-style APIs

\* JavaScript Fetch API

\* Chart.js data visualization

\* Data analysis and dashboard design

\* Excel report generation

\* SQL database management

\* Responsive web development

\* Git and GitHub project management



\## Future Improvements



\* Live IPL data integration

\* Advanced player comparison

\* Team prediction models

\* More interactive filters

\* Player performance trends

\* Advanced statistical analysis

\* Automated report generation

\* Additional data visualization



\## Author



\*\*Ganesh Munde\*\*



GitHub:

https://github.com/ganeshmunde-dev



\## Repository



https://github.com/ganeshmunde-dev/IPL-Analytics-Dashboard



\## License



This project is developed for educational and portfolio purposes.



