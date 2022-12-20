# Grant Microservice Mesh Service Account secrets read permissions (for this service)
#
# Important: Change <PROJECT_ID> to your project (check 'gcloud projects list')
#
PROJECT_ID="[PROJECT_ID]"
IAM_SA_NAME="registration-servicemesh-account"

echo $PROJECT_ID
echo $IAM_SA_NAME

# Step 1. Ensure (the GCP IAM) service account exists
#
IAM_SA_EXISTS=$(gcloud iam service-accounts list --filter="${IAM_SA_NAME}" | wc -l)

if [ "$IAM_SA_EXISTS" != "0" ]; then
  # Step 2: Set up secrets (with default values) if they don't exist yet
  #
  gcloud secrets versions list --quiet --project=$PROJECT_ID SVR_APP_AUTHSERVER_HOST

  if [ $? -ne 0 ]; then
    echo "SO creating SVR_APP_AUTHSERVER_HOST with a default value (needs changing):"

    echo -n "http://localhost:8180" | gcloud secrets create SVR_APP_AUTHSERVER_HOST \
    --replication-policy="automatic" \
    --data-file=-

    echo "AND setting up policy binding to service account:"

    gcloud secrets add-iam-policy-binding SVR_APP_AUTHSERVER_HOST --project $PROJECT_ID --member="serviceAccount:${IAM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
  else
    echo "Secret SVR_APP_AUTHSERVER_HOST exists, no actions taken"
  fi

  #
  #
  gcloud secrets versions list --quiet --project=$PROJECT_ID SVR_APP_AUTHSERVER_CLIENT_ID

  if [ $? -ne 0 ]; then
    echo "SO creating SVR_APP_AUTHSERVER_CLIENT_ID with a default value (needs changing):"

    echo -n "registrationclient" | gcloud secrets create SVR_APP_AUTHSERVER_CLIENT_ID \
    --replication-policy="automatic" \
    --data-file=-

    echo "AND setting up policy binding to service account:"

    gcloud secrets add-iam-policy-binding SVR_APP_AUTHSERVER_CLIENT_ID --project $PROJECT_ID --member="serviceAccount:${IAM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
  else
    echo "Secret SVR_APP_AUTHSERVER_CLIENT_ID exists, no actions taken"
  fi

  #
  #
  gcloud secrets versions list --quiet --project=$PROJECT_ID SVR_APP_AUTHSERVER_CLIENT_SECRET

  if [ $? -ne 0 ]; then
    echo "SO creating SVR_APP_AUTHSERVER_CLIENT_SECRET with a default value (needs changing):"

    echo -n "oidcsecret" | gcloud secrets create SVR_APP_AUTHSERVER_CLIENT_SECRET \
    --replication-policy="automatic" \
    --data-file=-

    echo "AND setting up policy binding to service account:"

    gcloud secrets add-iam-policy-binding SVR_APP_AUTHSERVER_CLIENT_SECRET --project $PROJECT_ID --member="serviceAccount:${IAM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
  else
    echo "Secret SVR_APP_AUTHSERVER_CLIENT_SECRET exists, no actions taken"
  fi  

  #
  #
  gcloud secrets versions list --quiet --project=$PROJECT_ID SVR_APP_FRONTCHANNEL_LOGIN_PATH_PREFIX

  if [ $? -ne 0 ]; then
    echo "SO creating SVR_APP_FRONTCHANNEL_LOGIN_PATH_PREFIX with a default value (needs changing):"

    echo -n "/auth/realms/registrationrealm/protocol/openid-connect/auth?client_id=" | gcloud secrets create SVR_APP_FRONTCHANNEL_LOGIN_PATH_PREFIX \
    --replication-policy="automatic" \
    --data-file=-

    echo "AND setting up policy binding to service account:"

    gcloud secrets add-iam-policy-binding SVR_APP_FRONTCHANNEL_LOGIN_PATH_PREFIX --project $PROJECT_ID --member="serviceAccount:${IAM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
  else
    echo "Secret SVR_APP_FRONTCHANNEL_LOGIN_PATH_PREFIX exists, no actions taken"
  fi

  #
  #
  gcloud secrets versions list --quiet --project=$PROJECT_ID SVR_APP_FRONTCHANNEL_LOGIN_PATH_SUFFIX

  if [ $? -ne 0 ]; then
    echo "SO creating SVR_APP_FRONTCHANNEL_LOGIN_PATH_SUFFIX with a default value (needs changing):"

    echo -n "&response_type=code&state=" | gcloud secrets create SVR_APP_FRONTCHANNEL_LOGIN_PATH_SUFFIX \
    --replication-policy="automatic" \
    --data-file=-

    echo "AND setting up policy binding to service account:"

    gcloud secrets add-iam-policy-binding SVR_APP_FRONTCHANNEL_LOGIN_PATH_SUFFIX --project $PROJECT_ID --member="serviceAccount:${IAM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
  else
    echo "Secret SVR_APP_FRONTCHANNEL_LOGIN_PATH_SUFFIX exists, no actions taken"
  fi

  #
  #
  gcloud secrets versions list --quiet --project=$PROJECT_ID SVR_APP_REDIRECT_PATH

  if [ $? -ne 0 ]; then
    echo "SO creating SVR_APP_REDIRECT_PATH with a default value (needs changing):"

    echo -n "&redirect_uri=" | gcloud secrets create SVR_APP_REDIRECT_PATH \
    --replication-policy="automatic" \
    --data-file=-

    echo "AND setting up policy binding to service account:"

    gcloud secrets add-iam-policy-binding SVR_APP_REDIRECT_PATH --project $PROJECT_ID --member="serviceAccount:${IAM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
  else
    echo "Secret SVR_APP_REDIRECT_PATH exists, no actions taken"
  fi

  #
  #
  gcloud secrets versions list --quiet --project=$PROJECT_ID SVR_APP_REDIRECT_URI

  if [ $? -ne 0 ]; then
    echo "SO creating SVR_APP_REDIRECT_URI with a default value (needs changing):"

    echo -n "http://localhost:3001/oauth-callback" | gcloud secrets create SVR_APP_REDIRECT_URI \
    --replication-policy="automatic" \
    --data-file=-

    echo "AND setting up policy binding to service account:"

    gcloud secrets add-iam-policy-binding SVR_APP_REDIRECT_URI --project $PROJECT_ID --member="serviceAccount:${IAM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
  else
    echo "Secret SVR_APP_REDIRECT_URI exists, no actions taken"
  fi

  #
  #
  gcloud secrets versions list --quiet --project=$PROJECT_ID SVR_APP_FRONTCHANNEL_LOGOUT_PATH_PREFIX

  if [ $? -ne 0 ]; then
    echo "SO creating SVR_APP_FRONTCHANNEL_LOGOUT_PATH_PREFIX with a default value (needs changing):"

    echo -n "/auth/realms/registrationrealm/protocol/openid-connect/logout?client_id=" | gcloud secrets create SVR_APP_FRONTCHANNEL_LOGOUT_PATH_PREFIX \
    --replication-policy="automatic" \
    --data-file=-

    echo "AND setting up policy binding to service account:"

    gcloud secrets add-iam-policy-binding SVR_APP_FRONTCHANNEL_LOGOUT_PATH_PREFIX --project $PROJECT_ID --member="serviceAccount:${IAM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
  else
    echo "Secret SVR_APP_FRONTCHANNEL_LOGOUT_PATH_PREFIX exists, no actions taken"
  fi

  #
  #
  gcloud secrets versions list --quiet --project=$PROJECT_ID SVR_APP_BACKCHANNEL_TOKEN_REQUEST_PATH

  if [ $? -ne 0 ]; then
    echo "SO creating SVR_APP_BACKCHANNEL_TOKEN_REQUEST_PATH with a default value (needs changing):"

    echo -n "/auth/realms/registrationrealm/protocol/openid-connect/token" | gcloud secrets create SVR_APP_BACKCHANNEL_TOKEN_REQUEST_PATH \
    --replication-policy="automatic" \
    --data-file=-

    echo "AND setting up policy binding to service account:"

    gcloud secrets add-iam-policy-binding SVR_APP_BACKCHANNEL_TOKEN_REQUEST_PATH --project $PROJECT_ID --member="serviceAccount:${IAM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
  else
    echo "Secret SVR_APP_BACKCHANNEL_TOKEN_REQUEST_PATH exists, no actions taken"
  fi

else
  echo "Service account does not yet exist, execute registrationservicemeshsetup/createServiceMeshAccounts.sh once following K8s cluster initial set-up"
fi