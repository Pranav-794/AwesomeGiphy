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

function compare_two_origin_branch_hashes () 
{
	hash1=$(git rev-parse --verify "$origin"${1})
	hash2=$(git rev-parse --verify "$origin"${2})
	if [ hash1 = hash2 ]; then
		return 0
	else
		return 1
	fi

}

echo "Enter the released version. (Example: 4.5.0)"
read version

master_branch=masters
feature_branch="feature/v"${version}

if is_in_remote $master_branch $1; 
	then echo "master branch does not exist!"; exit 1
fi

if is_in_remote $feature_branch $1;
 then echo "feature/v$version branch does not exist!"; exit 1
fi
 
if compare_two_origin_branch_hashes $master_branch $feature_branch $1; then 
		echo "$master_branch is out of sync with $feature_branch.\n Please update $master_branch" exit 1
fi
