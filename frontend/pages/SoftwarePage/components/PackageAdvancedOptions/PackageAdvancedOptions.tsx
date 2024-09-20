import React, { useState } from "react";
import { noop } from "lodash";

import { LEARN_MORE_ABOUT_BASE_LINK } from "utilities/constants";

import {
  isPackageType,
  isWindowsPackageType,
  PackageType,
} from "interfaces/package_type";

import CustomLink from "components/CustomLink";
import RevealButton from "components/buttons/RevealButton";

import { IPackageFormData } from "../PackageForm/PackageForm";
import AdvancedOptionsFields from "../AdvancedOptionsFields";

const getSupportedScriptTypeText = (pkgType: PackageType) => {
  return `Currently, ${
    isWindowsPackageType(pkgType) ? "PowerS" : "s"
  }hell scripts are supported.`;
};

const PKG_TYPE_TO_ID_TEXT = {
  pkg: "package IDs",
  deb: "package name",
  msi: "product code",
  exe: "software name",
} as const;

const getInstallHelpText = (pkgType: PackageType) => (
  <>
    Use the $INSTALLER_PATH variable to point to the installer.{" "}
    {getSupportedScriptTypeText(pkgType)}{" "}
    <CustomLink
      url={`${LEARN_MORE_ABOUT_BASE_LINK}/install-scripts`}
      text="Learn more about install scripts"
      newTab
    />
  </>
);

const getPostInstallHelpText = (pkgType: PackageType) => {
  return getSupportedScriptTypeText(pkgType);
};

const getUninstallHelpText = (pkgType: PackageType) => {
  return (
    <>
      $PACKAGE_ID will be populated with the {PKG_TYPE_TO_ID_TEXT[pkgType]} from
      the .{pkgType} file after the software is added.{" "}
      {getSupportedScriptTypeText(pkgType)}{" "}
      <CustomLink
        url={`${LEARN_MORE_ABOUT_BASE_LINK}/uninstall-scripts`}
        text="Learn more about uninstall scripts"
        newTab
      />
    </>
  );
};

const baseClass = "package-advanced-options";

interface IPackageAdvancedOptionsProps {
  errors: { preInstallQuery?: string; postInstallScript?: string };
  selectedPackage: IPackageFormData["software"];
  preInstallQuery?: string;
  installScript: string;
  postInstallScript?: string;
  uninstallScript?: string;
  onChangePreInstallQuery: (value?: string) => void;
  onChangeInstallScript: (value: string) => void;
  onChangePostInstallScript: (value?: string) => void;
  onChangeUninstallScript: (value?: string) => void;
}

const PackageAdvancedOptions = ({
  errors,
  selectedPackage,
  preInstallQuery,
  installScript,
  postInstallScript,
  uninstallScript,
  onChangePreInstallQuery,
  onChangeInstallScript,
  onChangePostInstallScript,
  onChangeUninstallScript,
}: IPackageAdvancedOptionsProps) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const renderAdvancedOptions = () => {
    const name = selectedPackage?.name || "";
    const ext = name.split(".").pop() as PackageType;
    if (!isPackageType(ext)) {
      // this should never happen
      return null;
    }
    return (
      <AdvancedOptionsFields
        className={`${baseClass}__input-fields`}
        showSchemaButton={false}
        installScriptHelpText={getInstallHelpText(ext)}
        postInstallScriptHelpText={getPostInstallHelpText(ext)}
        uninstallScriptHelpText={getUninstallHelpText(ext)}
        errors={errors}
        preInstallQuery={preInstallQuery}
        installScript={installScript}
        postInstallScript={postInstallScript}
        uninstallScript={uninstallScript}
        onClickShowSchema={noop}
        onChangePreInstallQuery={onChangePreInstallQuery}
        onChangeInstallScript={onChangeInstallScript}
        onChangePostInstallScript={onChangePostInstallScript}
        onChangeUninstallScript={onChangeUninstallScript}
      />
    );
  };

  return (
    <div className={baseClass}>
      <RevealButton
        className={`${baseClass}__accordion-title`}
        isShowing={showAdvancedOptions}
        showText="Advanced options"
        hideText="Advanced options"
        caretPosition="after"
        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        disabled={!selectedPackage}
        disabledTooltipContent={
          selectedPackage
            ? "Choose a file to modify advanced options."
            : undefined
        }
      />
      {showAdvancedOptions && !!selectedPackage && renderAdvancedOptions()}
    </div>
  );
};

export default PackageAdvancedOptions;
