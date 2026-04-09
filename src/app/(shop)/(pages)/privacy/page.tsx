'use client';

import styles from './page.module.css';
import PageTitle from '@/components/page-title';
import Title from '@/components/title';

export default function PrivacyPage() {
  const email = atob('dG0wZTgzQGdtYWlsLmNvbQ==');

  return (
    <div className={styles.page}>
      <PageTitle>Privacy Policy</PageTitle>

      <div className={styles.section}>
        <Title level={2}>1. Responsible Party</Title>
        <p>
          Timo Ribeiro Szyszka<br />
          Neugasse 21<br />
          68649 Groß-Rohrheim<br />
          Germany<br />
          E-Mail: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>2. General Information</Title>
        <p>
          We take the protection of your personal data very seriously. This privacy policy explains what data we collect when you use this website, for what purpose it is used, and your rights in relation to your data.
        </p>
        <p>
          This website is a demo project and is operated without any commercial intent. The processing of personal data is carried out in accordance with the General Data Protection Regulation (GDPR) and applicable national data protection laws.
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>3. Data We Collect</Title>
        <h3>3.1 Account Data</h3>
        <p>
          When you create an account or sign in, the following data is collected and processed:
        </p>
        <ul>
          <li>E-mail address</li>
          <li>Password (stored in hashed form by Firebase, never accessible in plain text)</li>
          <li>Account creation date and last sign-in time</li>
        </ul>
        <h3>3.2 Order and Profile Data</h3>
        <p>
          When you place an order or update your profile, the following data may be stored:
        </p>
        <ul>
          <li>Name and address (billing and/or shipping)</li>
          <li>Order contents, quantities, and totals</li>
          <li>Selected shipping and payment methods</li>
          <li>Applied voucher codes</li>
        </ul>
        <h3>3.3 Usage Data</h3>
        <p>
          When you access this website, your browser automatically transmits technical data to our hosting infrastructure. This may include your IP address, browser type and version, operating system, referrer URL, and the date and time of your visit. This data is not stored by us beyond what Firebase infrastructure may retain as part of its standard operations.
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>4. Firebase (Google)</Title>
        <p>
          This website uses Firebase, a platform developed by Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). We use the following Firebase services:
        </p>
        <ul>
          <li><strong>Firebase Authentication</strong> — to handle user registration and login securely.</li>
          <li><strong>Firebase Realtime Database</strong> — to store and retrieve product, category, order, and user data.</li>
        </ul>
        <p>
          The Firebase Realtime Database used by this application is located in the <strong>europe-west1</strong> (Belgium) region, ensuring data is stored within the European Union.
        </p>
        <p>
          Firebase Authentication may use cookies or browser storage to maintain your session after login. These are technically necessary for the application to function when you are signed in.
        </p>
        <p>
          Google LLC is certified under the EU-U.S. Data Privacy Framework, providing an adequate level of data protection for transfers to the US.
          For more information, see <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
        </p>
        <p>
          The legal basis for this processing is our legitimate interest in providing a functional web application (Art. 6(1)(f) GDPR), and where applicable, the performance of a contract (Art. 6(1)(b) GDPR).
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>5. Local Storage</Title>
        <p>
          This website stores your shopping cart contents in your browser&apos;s <strong>localStorage</strong> under the key <code>cart</code>. This data is stored exclusively on your device and is never transmitted to any server independently. It is used solely to preserve your cart between page reloads.
        </p>
        <p>
          You can clear this data at any time via your browser&apos;s developer tools or by clearing your browser&apos;s site data.
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>6. Cookies</Title>
        <p>
          This website does not use tracking cookies or advertising cookies. Firebase Authentication may set session-related cookies in your browser that are strictly necessary for maintaining your logged-in state. These cookies are not used for analytics or tracking purposes.
        </p>
        <p>
          You can configure your browser to reject cookies; however, this may prevent some features (such as staying logged in) from working correctly.
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>7. Data Sharing and Third Parties</Title>
        <p>
          We do not sell or share your personal data with third parties for marketing purposes. Data is transmitted to Google/Firebase solely to the extent required to operate the services described above. No other third-party services (such as analytics tools, ad networks, or social plugins) are integrated into this website.
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>8. Data Retention</Title>
        <p>
          <strong>This demo shop automatically resets all data every 24 hours.</strong> This includes all user accounts, orders, and product data stored in Firebase. As a result, any personal data you provide (such as your e-mail address and order information) is automatically and permanently deleted within 24 hours of creation.
        </p>
        <p>
          This automatic deletion effectively fulfills your right to erasure (Art. 17 GDPR). If you wish to have your data deleted before the next scheduled reset, you may contact us at any time (see Section 1).
        </p>
        <p>
          Cart data stored in localStorage is retained until you clear your browser data or until the data is replaced by a new cart.
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>9. Your Rights</Title>
        <p>Under the GDPR, you have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Right of access</strong> (Art. 15 GDPR) — You may request information about the data we hold about you.</li>
          <li><strong>Right to rectification</strong> (Art. 16 GDPR) — You may request correction of inaccurate data.</li>
          <li><strong>Right to erasure</strong> (Art. 17 GDPR) — You may request deletion of your personal data.</li>
          <li><strong>Right to restriction of processing</strong> (Art. 18 GDPR) — You may request that we limit how we use your data.</li>
          <li><strong>Right to data portability</strong> (Art. 20 GDPR) — You may request a machine-readable copy of your data.</li>
          <li><strong>Right to object</strong> (Art. 21 GDPR) — You may object to processing based on legitimate interests.</li>
          <li><strong>Right to lodge a complaint</strong> — You have the right to lodge a complaint with a supervisory authority, in particular in the EU member state of your habitual residence or place of work.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>10. Data Security</Title>
        <p>
          We use industry-standard security measures to protect your data, including HTTPS encryption for all data transmitted between your browser and our services. Firebase provides built-in security features including encrypted data storage and secure authentication flows.
        </p>
        <p>
          Despite these measures, no internet-based service can be guaranteed to be completely secure. If you have concerns about the security of your data, please contact us.
        </p>
      </div>

      <div className={styles.section}>
        <Title level={2}>11. Changes to This Privacy Policy</Title>
        <p>
          We reserve the right to update this privacy policy at any time. The current version is always available on this page. We encourage you to review this policy periodically.
        </p>
        <p>Last updated: April 2026</p>
      </div>

    </div>
  );
}
