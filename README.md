# Cybersecurity ITS App

The Field Device Security Configuration Tool prototype will provide the ITS Vendor community with a reference design and example implementation of a mobile application and backend cloud service that can be used to guide ITS vendor customers in the secure configuration of ITS equipment. ITS vendors will be able to use the prototype to design their own custom versions of the mobile application and offer the application to their customer base.

Vendor-specific Field Device Security Configuration Tools will be used by ITS Technicians as an aid, providing them with the equipment vendor’s recommended security configuration details for the specific equipment type, connection type and intended use. The Field Device Security Configuration Tool is a mobile application that an ITS Technician can install on either an Android or iPhone device.

## Contents
This repository contains the source code for the user-facing frontend components of the Vendor Portal for the Cybersecurity for ITS application. This component allows Vendor-role users to administrate both users and data. Vendor-role users are able to create user accounts, manage user permissions, and upload and modify device configuration recommendations.

# Structure:
- `api/`: Functions related to Cybersecurity for ITS API calls
- `app/`: General structure for the application
- `common/`: Shared comonents, data, and utilities
- `config/`: Configuration elements for the application
- `features/`: Packages with individual features for the application such as authentication and configuration
- `pages/`:  The overall page structures for the application
- `theme/`: Theme definition for the application

## Related Repositories:
 - [Cybersecurity-ITS-Frontend](https://github.com/usdot-fhwa-OPS/Cybersecurity-ITS-Frontend): The cloud-hosted user interface for Vendor users to upload and manage device configuration recommendations.
 - [ITS-Cybersecurity-ITS-Backend](https://github.com/usdot-fhwa-OPS/Cybersecurity-ITS-Backend): The backend cloud services to connect technician and vendor users.
