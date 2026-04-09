'use client';

import styles from './page.module.css';
import PageTitle from '@/components/page-title';
import Title from '@/components/title';

export default function PrivacyPage() {
  const email = atob('dG0wZTgzQGdtYWlsLmNvbQ==');

  return (
    <div className={styles.page}>
      <PageTitle>Imprint</PageTitle>

      <div className={styles.section}>
        <Title level={2}>Contact Information</Title>
        <p>
          Timo Ribeiro Szyszka<br />
          Neugasse 21<br />
          68649 Groß-Rohrheim<br />
          Germany
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>Contact</Title>
        <p>
          E-Mail: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>Notice</Title>
        <p>
          This website is a private demo project for development and testing purposes only. It has no commercial intent.
          All products, prices, and orders shown are entirely fictitious — no real purchases can be made and no real goods or services are provided.
          All data (user accounts, orders, and products) is automatically reset every 24 hours.
          There is no VAT identification number.
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>Liability for Content</Title>
        <p>
          As a service provider, I am responsible for my own content on this website in accordance with general laws. However, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that may indicate illegal activity.
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>Liability for Links</Title>
        <p>
          This website may contain links to external third-party websites over whose content I have no control. The respective provider or operator of those pages is always responsible for their content. If I become aware of any legal violations, I will remove such links immediately.
        </p>
      </div>
    </div>
  );
}
