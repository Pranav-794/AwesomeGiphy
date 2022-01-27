#!/usr/bin/env bash

function is_in_remote () 
{
    existed_in_remote=$(git ls-remote --heads origin ${1})
    if [[ -z ${existed_in_remote} ]]; then
        return 0
    else
        return 1
    fi
}

echo "Enter the released version. (Example: 4.5.0)"
read version

version_tag="tag-v${version}"

master_branch="master"
feature_branch="feature/v"${version}

if is_in_remote $master_branch $1; 
	then echo "master branch does not exist!"; exit 1
fi

if is_in_remote $feature_branch $1;
 then echo "feature/v$version branch does not exist!"; exit 1
fi

master_hash=$(git rev-parse --verify "origin/"${master_branch})
feature_hash=$(git rev-parse --verify "origin/"${feature_branch})
if [[ "$master_hash" != "$master_hash" ]]; then 
	printf "$master_branch is out of sync with $feature_branch. Please update your $master_branch branch"; exit 1
fi

arrIN=(${version//./ })
major_verison=${arrIN[0]}
stable_tag="tag-v${major_verison}-stable"
if [[ -z $(git rev-parse -q --verify "refs/tags/${stable_tag}") ]]; then
    echo "The stable release tag '${stable_tag} NOT FOUND!'"
    # if tag is not created, can we go ahead and create the tag anyways?
    exit 1
else 
    git tag -d ${stable_tag}
fi

git tag -a ${stable_tag} ${master_hash} -m "Stable promoted v${major_verison}"
git push origin -f ${stable_tag}

git tag -d ${version_tag}
git tag -a ${version_tag} $master_hash -m "Tagging ${version_tag}" 
git push origin -f ${version_tag}

printf "\nStable tag '${stable_tag}' has been updated with the most recent master changes"
printf "\nRelease tag '${version_tag}' has been updated with the most recent master changes\n"



