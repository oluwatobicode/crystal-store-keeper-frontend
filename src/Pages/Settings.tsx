import SettingsHeader from "../components/settings/SettingsHeader";
import SettingsTabs from "../components/settings/SettingsTabs";

const Settings = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-10 p-6">
      <SettingsHeader />
      <SettingsTabs />
    </div>
  );
};

export default Settings;
