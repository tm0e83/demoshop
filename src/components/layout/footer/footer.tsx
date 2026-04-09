'use client';

import styles from './footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useCategories } from '@/hooks';

export default function Footer() {
  const { categories } = useCategories();

  return (
    <footer className={styles.footer}>
      {categories && categories.length > 0 && (
        <div className="container d-flex mb-4">
          <div className={`${styles.footerMenus}`}>
            <div className="footer-column">
              <div className={styles.footerColumnTitle}>Categories</div>
              <ul className={styles.footerColumnList}>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link href={`/category/${category.id}`}>{category.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <div className={styles.footerColumnTitle}>Info</div>
              <ul className={styles.footerColumnList}>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/imprint">Imprint</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.socialLinks}>
            <a href="https://github.com/tm0e83/demoshop" title="View on Github" target="_blank">
              <Image
                src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3E%3Cpath%20fill='%23000000'%20d='M12%200c-6.626%200-12%205.373-12%2012%200%205.302%203.438%209.8%208.207%2011.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729%201.205.084%201.839%201.237%201.839%201.237%201.07%201.834%202.807%201.304%203.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931%200-1.311.469-2.381%201.236-3.221-.124-.303-.535-1.524.117-3.176%200%200%201.008-.322%203.301%201.23.957-.266%201.983-.399%203.003-.404%201.02.005%202.047.138%203.006.404%202.291-1.552%203.297-1.23%203.297-1.23.653%201.653.242%202.874.118%203.176.77.84%201.235%201.911%201.235%203.221%200%204.609-2.807%205.624-5.479%205.921.43.372.823%201.102.823%202.222v3.293c0%20.319.192.694.801.576%204.765-1.589%208.199-6.086%208.199-11.386%200-6.627-5.373-12-12-12z'/%3E%3C/svg%3E"
                alt="Github Logo"
                width={24}
                height={24}
              />
            </a>
            <a href="https://www.xing.com/profile/Timo_RibeiroSzyszka" title="Find me on Xing" target="_blank">
              <Image
                src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMzIgMzIiPiAgPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTYuMDQsMEM3LjIsLTAuMDIsMC4wMiw3LjEyLDAsMTUuOTZDLTAuMDIsMjQuOCw3LjEyLDMxLjk4LDE1Ljk2LDMyQzI0LjgsMzIuMDIsMzEuOTgsMjQuODgsMzIsMTYuMDRDMzIuMDIsNy4yLDI0Ljg4LDAuMDIsMTYuMDQsMHogTTcuMzYsMTkuNDhjMC4wOCwtMC4xMSwwLjE0LC0wLjIyLDAuMjEsLTAuMzRsMi45OCwtNC44OWMtMC4zNiwtMC41NCwtMS40LC0yLjQ5LC0xLjgyLC0zLjIyYy0wLjEsLTAuMTgtMC4yLC0wLjM0LC0wLjMsLTAuNTNjLTAuMTcsLTAuMzEsLTAuMzQsLTAuNDYsLTAuMTMsLTAuNDZsMy43NywwLjAxYzAuMTgsMCwwLjE5LDAuMDYsMC4yNSwwLjE4bDIuMjgsNC4wN2MtMC4xNSwwLjIyLC0wLjI3LDAuNDIsLTAuNDEsMC42NmMtMC4zLDAuNSwtMi42OSw0LjMyLC0yLjc0LDQuNTNMNy4zNiwxOS40OHogTTI0LjI5LDcuNDZsLTEuMiwyLjA5Yy0xLjAzLDEuNywtMi4xNywzLjgsLTMuMTgsNS41NWwtMS41OSwyLjc4bDMuMDYsNS4zOWMwLjE5LDAuMzIsMC4zMywwLjU5LDAuNTIsMC45MWMwLjEsMC4xNywwLjE3LDAuMywwLjI2LDAuNDZjMC4wNiwwLjExLDAuMiwwLjMyLDAuMjMsMC40NGwtNC4yOSwtMC4wMWMtMC4xNiwtMC4zMSwtMC4zNSwtMC42MSwtMC41MSwtMC45MWMtMSwtMS44NiwtMi4yNywtMy45NiwtMy4zMywtNS44N2MtMC4wOCwtMC4xNSwtMC4xOSwtMC4yOSwtMC4yMiwtMC40NWMwLjA4LC0wLjEyLDAuMTMsLTAuMjIsMC4yMSwtMC4zNWMwLjA3LC0wLjEyLDAuMTMsLTAuMjMsMC4yLC0wLjM1YzAuMTQsLTAuMjQsMC4yNSwtMC40NSwwLjM5LC0wLjY4bDIuMzksLTQuMTZjMC40OCwtMC44OSwxLjExLC0xLjg5LDEuNTksLTIuNzdjMC40OCwtMC44NywxLjE0LC0xLjkyLDEuNTksLTIuNzdsNC4yOSwwLjAxQzI0LjU2LDYuOTksMjQuNDIsNy4yMiwyNC4yOSw3LjQ2eiIvPjwvc3ZnPg=="
                alt="Xing Logo"
                width={24}
                height={24}
              />
            </a>
            <a href="https://www.linkedin.com/in/timo-ribeiro-szyszka-2159873b9/" title="Find me on LinkedIn" target="_blank">
              <Image
                src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20width='24'%20height='24'%3E%3Cpath%20fill='%23000000'%20d='M12%200C5.373%200%200%205.373%200%2012s5.373%2012%2012%2012%2012-5.373%2012-12S18.627%200%2012%200zm-3.375%2016.625H6V8.625h2.625v8zm-1.312-9.125c-.838%200-1.5-.663-1.5-1.5s.663-1.5%201.5-1.5%201.5.663%201.5%201.5-.663%201.5-1.5%201.5zM18%2016.625h-2.625v-4.125c0-.98-.35-1.65-1.225-1.65-.668%200-1.066.45-1.24.88-.065.158-.08.38-.08.6v4.295H10.2V8.625h2.625v1.125c.35-.538.975-1.3%202.363-1.3%201.725%200%203.012%201.125%203.012%203.54v4.635z'/%3E%3C/svg%3E"
                alt="LinkedIn Logo"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      )}
    </footer>
  );
};

