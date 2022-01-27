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

master_branch=master
feature_branch="feature/v"${version}

if is_in_remote $master_branch $1; 
	then echo "master branch does not exist!"; exit 1
fi

if is_in_remote $feature_branch $1;
 then echo "feature/v$version branch does not exist!"; exit 1
fi


hash1=$(git rev-parse --verify "origin/"${master_branch})
hash2=$(git rev-parse --verify "origin/"${feature_branch})
[[ hash1 = hash2 ]]
if [[ $? = 1 ]]; then 
	printf "$master_branch is out of sync with $feature_branch. Please update your $master_branch branch"; exit 1
fi

arrIN=(${version//./ })
major_verison=${arrIN[0]}
stable_tag="tag-v${major_verison}-stable"
if [[ -z $(git rev-parse -q --verify "refs/tags/${stable_tag}") ]]; then
    echo "The stable release tag '${stable_tag} NOT FOUND!'"
    exit 1
fi





# $(compare_two_origin_branch_hashes $master_branch $feature_branch)
# if [[ $? = 1 ]]; then 
# 	printf "$master_branch is out of sync with $feature_branch. Please update your $master_branch branch"; exit 1
# fi


